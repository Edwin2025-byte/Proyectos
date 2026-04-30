from rest_framework import serializers
from ..models import Profesor


class ProfesorSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.CharField(source='usuario.nombre_completo', read_only=True)
    email = serializers.CharField(source='usuario.email', read_only=True)

    class Meta:
        model = Profesor
        fields = (
            'profesor_id', 'usuario', 'nombre_completo', 'email',
            'especialidad', 'estado',
            'fecha_creacion', 'fecha_modificacion'
        )
        read_only_fields = ('fecha_creacion', 'fecha_modificacion')