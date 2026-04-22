from rest_framework import serializers
from ..models import Curso


class CursoSerializer(serializers.ModelSerializer):
    profesor_nombre = serializers.CharField(source='profesor.usuario.nombre_completo', read_only=True)

    class Meta:
        model = Curso
        fields = (
            'curso_id', 'nombre_clase', 'descripcion',
            'profesor', 'profesor_nombre', 'codigo_acceso',
            'imagen_url', 'duracion_horas', 'es_premium',
            'estado', 'fecha_creacion', 'fecha_modificacion'
        )
        read_only_fields = ('fecha_creacion', 'fecha_modificacion', 'codigo_acceso')