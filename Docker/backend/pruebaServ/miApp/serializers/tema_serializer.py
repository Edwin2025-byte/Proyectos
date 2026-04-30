from rest_framework import serializers
from ..models import Tema


class TemaSerializer(serializers.ModelSerializer):
    curso_nombre = serializers.CharField(source='curso.nombre_clase', read_only=True)

    class Meta:
        model = Tema
        fields = (
            'tema_id', 'curso', 'curso_nombre',
            'nombre_tema', 'descripcion', 'orden',
            'estado', 'fecha_creacion', 'fecha_modificacion'
        )
        read_only_fields = ('fecha_creacion', 'fecha_modificacion')