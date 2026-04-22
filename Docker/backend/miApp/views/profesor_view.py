from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Profesor
from ..serializers import ProfesorSerializer


class ProfesorViewSet(viewsets.ModelViewSet):
    queryset = Profesor.objects.all()
    serializer_class = ProfesorSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['especialidad', 'usuario__nombre_completo', 'usuario__email']
    ordering_fields = ['especialidad', 'fecha_creacion']
    ordering = ['-fecha_creacion']