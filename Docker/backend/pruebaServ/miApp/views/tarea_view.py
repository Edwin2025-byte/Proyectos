from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Tarea
from ..serializers import TareaSerializer


class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['titulo', 'descripcion']
    ordering_fields = ['fecha_limite', 'xp_recompensa', 'fecha_creacion']
    ordering = ['-fecha_creacion']

    def get_queryset(self):
        queryset = super().get_queryset()
        tema_id = self.request.query_params.get('tema_id')
        if tema_id:
            queryset = queryset.filter(tema_id=tema_id)
        return queryset