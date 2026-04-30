from rest_framework import serializers
from ..models import Inscripcion


class InscripcionSerializer(serializers.ModelSerializer):
    estudiante_nombre = serializers.CharField(source='estudiante.usuario.nombre_completo', read_only=True)
    curso_nombre = serializers.CharField(source='curso.nombre_clase', read_only=True)

    class Meta:
        model = Inscripcion
        fields = (
            'inscripcion_id', 'curso', 'curso_nombre',
            'estudiante', 'estudiante_nombre',
            'estado', 'fecha_creacion', 'fecha_modificacion'
        )
        read_only_fields = ('fecha_creacion', 'fecha_modificacion')