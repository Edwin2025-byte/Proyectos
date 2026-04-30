from rest_framework import serializers
from ..models import Logro


class LogroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logro
        fields = '__all__'
        read_only_fields = ('fecha_creacion', 'fecha_modificacion')