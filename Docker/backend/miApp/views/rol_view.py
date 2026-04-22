from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Rol
from ..serializers import RolSerializer


class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nombre_rol', 'descripcion']
    ordering_fields = ['nombre_rol', 'fecha_creacion']
    ordering = ['nombre_rol']