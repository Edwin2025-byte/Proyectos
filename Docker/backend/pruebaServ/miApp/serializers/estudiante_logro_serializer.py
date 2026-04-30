from rest_framework import serializers
from ..models import EstudianteLogro

class EstudianteLogroSerializer(serializers.ModelSerializer):
    # Traemos la info de la tabla 'logros' para que la App tenga qué mostrar
    titulo = serializers.ReadOnlyField(source='logro.titulo')
    descripcion = serializers.ReadOnlyField(source='logro.descripcion')
    color = serializers.ReadOnlyField(source='logro.color')
    icono_url = serializers.ReadOnlyField(source='logro.icono_url')
    puntos_premio = serializers.ReadOnlyField(source='logro.puntos_premio')

    class Meta:
        model = EstudianteLogro
        fields = ['id', 'estudiante', 'logro', 'estado', 'titulo', 'descripcion', 'color', 'icono_url', 'puntos_premio']