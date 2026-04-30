from rest_framework import serializers
from ..models import Estudiante 

# Este es el que usa el Ranking
class EstudianteRankingSerializer(serializers.ModelSerializer):
    nombre = serializers.ReadOnlyField(source='usuario.nombre_completo')
    xp_actual = serializers.ReadOnlyField(source='usuario.xp') # Usando 'xp' que es el real
    nivel = serializers.ReadOnlyField(source='usuario.nivel')
    usuario_id = serializers.ReadOnlyField(source='usuario.usuario_id')

    class Meta:
        model = Estudiante
        fields = ['estudiante_id', 'usuario_id', 'nombre', 'xp_actual', 'nivel']

# Este es el que faltaba y causaba el ImportError
class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = '__all__'