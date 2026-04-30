from rest_framework import viewsets
from ..models import EstudianteLogro
from ..serializers import EstudianteLogroSerializer

class EstudianteLogroViewSet(viewsets.ModelViewSet):
    queryset = EstudianteLogro.objects.all()
    serializer_class = EstudianteLogroSerializer

    def get_queryset(self):
        queryset = EstudianteLogro.objects.all()
        # Capturamos el ID del usuario logueado que viene de la App
        id_usuario = self.request.query_params.get('estudiante_id')
        
        if id_usuario and id_usuario not in ['undefined', 'null', '']:
            try:
                # FILTRO CORRECTO SEGÚN TU PGADMIN:
                # estudiante -> tabla estudiantes
                # usuario -> tabla usuarios
                # usuario_id -> nombre de la columna PK en tu captura
                return queryset.filter(estudiante__usuario__usuario_id=int(id_usuario))
            except (ValueError, TypeError):
                return queryset.none()
        
        return queryset.none()