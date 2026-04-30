from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Pago
from ..serializers import PagoSerializer


class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['usuario__nombre_completo', 'usuario__email', 'id_transaccion_externa']
    ordering_fields = ['monto', 'fecha_pago', 'fecha_creacion', 'estado_pago']
    ordering = ['-fecha_creacion']

    def get_queryset(self):
        queryset = super().get_queryset()
        usuario_id = self.request.query_params.get('usuario_id')
        estado = self.request.query_params.get('estado_pago')
        if usuario_id:
            queryset = queryset.filter(usuario_id=usuario_id)
        if estado:
            queryset = queryset.filter(estado_pago=estado)
        return queryset