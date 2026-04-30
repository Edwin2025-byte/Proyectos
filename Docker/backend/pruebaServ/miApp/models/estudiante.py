from django.db import models
from .usuario import Usuario


class Estudiante(models.Model):
    estudiante_id = models.AutoField(primary_key=True)
    usuario = models.OneToOneField(
        Usuario, 
        on_delete=models.CASCADE, 
        db_column='usuario_id'
    )
    xp_actual = models.IntegerField(default=0)
    puntos_oro = models.IntegerField(default=0)
    nivel = models.IntegerField(default=1)
    avatar_url = models.CharField(max_length=255, null=True, blank=True)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'estudiantes'

    def __str__(self):
        return f"{self.usuario.nombre_completo} (Nivel {self.nivel} - {self.xp_actual} XP)"