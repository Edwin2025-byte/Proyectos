from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db import connection  # Fundamental para el SQL directo
import json

# Importamos solo los modelos que existen en tu models.py
from ..models import Usuario, Logro 
from ..serializers import UsuarioSerializer, UsuarioCreateSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['email', 'nombre_completo', 'telefono']
    ordering_fields = ['fecha_creacion', 'nombre_completo']
    ordering = ['-fecha_creacion']

    def get_serializer_class(self):
        if self.action == 'create':
            return UsuarioCreateSerializer
        return UsuarioSerializer

    # --- LOGIN ---
    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email y contraseña requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            usuario = Usuario.objects.select_related('rol').get(email=email)
            if usuario.password_hash == password:
                rol_actual = usuario.rol.nombre_rol if usuario.rol else 'Sin Rol'
                return Response({
                    'message': 'Login exitoso',
                    'rol': rol_actual,
                    'user': {
                        'usuario_id': usuario.usuario_id,
                        'email': usuario.email,
                        'nombre': usuario.nombre_completo,
                        'xp': getattr(usuario, 'xp', 0),
                        'nivel': getattr(usuario, 'nivel', 1)
                    }
                }, status=status.HTTP_200_OK)
            return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
        except Usuario.DoesNotExist:
            return Response({'error': 'El usuario no existe'}, status=status.HTTP_404_NOT_FOUND)

    # --- LISTAR ESTUDIANTES (Para DocenteHome.js) ---
    @action(detail=False, methods=['get'], url_path='estudiantes')
    def listar_estudiantes(self, request):
        # Filtramos usuarios que tengan el rol de 'Estudiante'
        estudiantes = Usuario.objects.filter(rol__nombre_rol='Estudiante', activo=True)
        serializer = UsuarioSerializer(estudiantes, many=True)
        return Response(serializer.data)

    # --- ASIGNAR LOGRO Y PUNTOS (Gamificación) ---
    @action(detail=False, methods=['post'], url_path='asignar-logro')
    def asignar_logro(self, request):
        usuario_id = request.data.get('usuario_id')
        logro_id = request.data.get('logro_id')

        try:
            usuario = Usuario.objects.get(usuario_id=usuario_id)
            
            with connection.cursor() as cursor:
                # 1. Obtenemos cuánto vale el logro (Insignia)
                cursor.execute("SELECT puntos_premio FROM logros WHERE logro_id = %s", [logro_id])
                row = cursor.fetchone()
                
                if not row:
                    return Response({'error': 'Logro no encontrado en la DB'}, status=status.HTTP_404_NOT_FOUND)
                
                puntos = row[0]

                # 2. Insertamos en la tabla puente manualmente (usuario_logros)
                cursor.execute(
                    "INSERT INTO usuario_logros (usuario_id, logro_id) VALUES (%s, %s)",
                    [usuario_id, logro_id]
                )

            # 3. Actualizamos XP y Nivel del usuario en la tabla usuarios
            usuario.xp = (usuario.xp or 0) + puntos
            # Subida de nivel: cada 100 puntos sube 1 nivel
            usuario.nivel = (usuario.xp // 100) + 1
            usuario.save()

            return Response({
                'message': 'Puntos y logro asignados con éxito',
                'nuevo_xp': usuario.xp,
                'nuevo_nivel': usuario.nivel
            }, status=status.HTTP_200_OK)

        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)