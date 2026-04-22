from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Tema
from ..serializers import TemaSerializer


class TemaViewSet(viewsets.ModelViewSet):
    queryset = Tema.objects.all()
    serializer_class = TemaSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nombre_tema', 'descripcion']
    ordering_fields = ['orden', 'nombre_tema', 'fecha_creacion']
    ordering = ['orden', 'nombre_tema']

    def get_queryset(self):
        queryset = super().get_queryset()
        curso_id = self.request.query_params.get('curso_id')
        if curso_id:
            queryset = queryset.filter(curso_id=curso_id)
        return queryset