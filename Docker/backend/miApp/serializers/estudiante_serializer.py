from rest_framework import serializers
from ..models import Estudiante


class EstudianteSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.CharField(source='usuario.nombre_completo', read_only=True)
    email = serializers.CharField(source='usuario.email', read_only=True)

    class Meta:
        model = Estudiante
        fields = (
            'estudiante_id', 'usuario', 'nombre_completo', 'email',
            'xp_actual', 'puntos_oro', 'nivel', 'avatar_url',
            'estado', 'fecha_creacion', 'fecha_modificacion'
        )
        read_only_fields = ('fecha_creacion', 'fecha_modificacion')


class EstudianteRankingSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.CharField(source='usuario.nombre_completo', read_only=True)

    class Meta:
        model = Estudiante
        fields = ('estudiante_id', 'nombre_completo', 'xp_actual', 'puntos_oro', 'nivel')