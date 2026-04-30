from rest_framework import serializers
from ..models import Pago


class PagoSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.nombre_completo', read_only=True)
    usuario_email = serializers.CharField(source='usuario.email', read_only=True)

    class Meta:
        model = Pago
        fields = (
            'pago_id', 'usuario', 'usuario_nombre', 'usuario_email',
            'monto', 'metodo_pago', 'id_transaccion_externa',
            'detalle_pago', 'estado_pago', 'fecha_pago',
            'estado', 'fecha_creacion', 'fecha_modificacion'
        )
        read_only_fields = ('fecha_creacion', 'fecha_modificacion')