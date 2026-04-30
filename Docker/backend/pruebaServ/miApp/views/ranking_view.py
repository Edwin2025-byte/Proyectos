from rest_framework import viewsets
from ..models.estudiante import Estudiante
from ..serializers.estudiante_serializer import EstudianteSerializer

class RankingViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Vista para obtener el ranking de estudiantes basado en XP_ACTUAL
    """
    # CORRECCIÓN: Se cambió '-xp' por '-xp_actual'
    queryset = Estudiante.objects.all().order_by('-xp_actual')
    serializer_class = EstudianteSerializer