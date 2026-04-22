from rest_framework import serializers
from ..models import EstudianteLogro


class EstudianteLogroSerializer(serializers.ModelSerializer):
    estudiante_nombre = serializers.CharField(source='estudiante.usuario.nombre_completo', read_only=True)
    logro_titulo = serializers.CharField(source='logro.titulo', read_only=True)
    puntos_premio = serializers.IntegerField(source='logro.puntos_premio', read_only=True)

    class Meta:
        model = EstudianteLogro
        fields = (
            'estudiante', 'estudiante_nombre',
            'logro', 'logro_titulo', 'puntos_premio',
            'fecha_obtencion', 'estado',
            'fecha_creacion', 'fecha_modificacion'
        )
        read_only_fields = ('fecha_creacion', 'fecha_modificacion', 'fecha_obtencion')