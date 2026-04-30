from rest_framework import serializers
from ..models import Entrega


class EntregaSerializer(serializers.ModelSerializer):
    estudiante_nombre = serializers.CharField(source='estudiante.usuario.nombre_completo', read_only=True)
    tarea_titulo = serializers.CharField(source='tarea.titulo', read_only=True)

    class Meta:
        model = Entrega
        fields = (
            'entrega_id', 'tarea', 'tarea_titulo',
            'estudiante', 'estudiante_nombre',
            'archivo_url', 'comentario_profesor',
            'nota', 'xp_ganada', 'estado_entrega',
            'fecha_entrega', 'estado',
            'fecha_creacion', 'fecha_modificacion'
        )
        read_only_fields = ('fecha_creacion', 'fecha_modificacion', 'fecha_entrega')


class EntregaCalificarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrega
        fields = ('nota', 'xp_ganada', 'comentario_profesor', 'estado_entrega')