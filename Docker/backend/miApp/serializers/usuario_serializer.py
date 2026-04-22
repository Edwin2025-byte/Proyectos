from rest_framework import serializers
from ..models import Usuario, Rol, Plan


class UsuarioSerializer(serializers.ModelSerializer):
    nombre_rol = serializers.CharField(source='rol.nombre_rol', read_only=True)
    nombre_plan = serializers.CharField(source='plan.nombre_plan', read_only=True)

    class Meta:
        model = Usuario
        fields = (
            'usuario_id', 'email', 'nombre_completo', 'telefono',
            'rol', 'nombre_rol', 'plan', 'nombre_plan',
            'activo', 'fecha_ultimo_acceso',
            'fecha_creacion', 'fecha_modificacion'
        )
        read_only_fields = ('fecha_creacion', 'fecha_modificacion', 'fecha_ultimo_acceso')
        extra_kwargs = {
            'password_hash': {'write_only': True}
        }


class UsuarioCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = (
            'usuario_id', 'email', 'password_hash', 'nombre_completo',
            'telefono', 'rol', 'plan', 'activo'
        )