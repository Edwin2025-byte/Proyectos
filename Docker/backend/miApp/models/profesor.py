from django.db import models
from .usuario import Usuario


class Profesor(models.Model):
    profesor_id = models.AutoField(primary_key=True)
    usuario = models.OneToOneField(
        Usuario, 
        on_delete=models.CASCADE, 
        db_column='usuario_id'
    )
    especialidad = models.CharField(max_length=100)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'profesores'

    def __str__(self):
        return f"Prof. {self.usuario.nombre_completo} - {self.especialidad or 'Sin especialidad'}"