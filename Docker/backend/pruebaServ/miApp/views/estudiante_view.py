from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Estudiante
from ..serializers.estudiante_serializer import EstudianteSerializer, EstudianteRankingSerializer

class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    filter_backends = [SearchFilter, OrderingFilter]

    @action(detail=False, methods=['get'], url_path='ranking')
    def ranking(self, request):
        try:
            # Ordenamos por 'usuario__xp' (el nombre real del campo)
            top = Estudiante.objects.filter(
                estado=True
            ).select_related('usuario').order_by('-usuario__xp')[:50] # <--- Cambiado a -usuario__xp
            
            serializer = EstudianteRankingSerializer(top, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(f"ERROR: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'], url_path='agregar-xp')
    def agregar_xp(self, request, pk=None):
        estudiante = self.get_object()
        puntos_nuevos = request.data.get('xp', 0)
        try:
            # Sumamos al campo 'xp' del usuario
            estudiante.usuario.xp += int(puntos_nuevos)
            estudiante.usuario.save()
            return Response({'nuevo_xp': estudiante.usuario.xp})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)