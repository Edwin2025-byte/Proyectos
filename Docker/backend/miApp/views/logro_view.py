from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Logro
from ..serializers import LogroSerializer


class LogroViewSet(viewsets.ModelViewSet):
    queryset = Logro.objects.all()
    serializer_class = LogroSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['titulo', 'descripcion']
    ordering_fields = ['puntos_premio', 'fecha_creacion']
    ordering = ['-puntos_premio']