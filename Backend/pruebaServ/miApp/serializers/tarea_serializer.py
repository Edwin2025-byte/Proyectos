from rest_framework import serializers
from ..models import Tarea


class TareaSerializer(serializers.ModelSerializer):
    tema_nombre = serializers.CharField(source='tema.nombre_tema', read_only=True)
    curso_nombre = serializers.CharField(source='tema.curso.nombre_clase', read_only=True)

    class Meta:
        model = Tarea
        fields = (
            'tarea_id', 'tema', 'tema_nombre', 'curso_nombre',
            'titulo', 'descripcion', 'tipo_tarea',
            'xp_recompensa', 'archivo_adjunto', 'fecha_limite',
            'estado', 'fecha_creacion', 'fecha_modificacion'
        )
        read_only_fields = ('fecha_creacion', 'fecha_modificacion')