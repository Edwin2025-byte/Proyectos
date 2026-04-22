from django.db import models
from .estudiante import Estudiante
from .logro import Logro


class EstudianteLogro(models.Model):
    estudiante = models.ForeignKey(
        Estudiante, 
        on_delete=models.CASCADE, 
        db_column='estudiante_id'
    )
    logro = models.ForeignKey(
        Logro, 
        on_delete=models.CASCADE, 
        db_column='logro_id'
    )
    fecha_obtencion = models.DateTimeField(auto_now_add=True)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'estudiante_logros'
        unique_together = (('estudiante', 'logro'),)

    def __str__(self):
        return f"🏆 {self.estudiante.usuario.nombre_completo} desbloqueó: {self.logro.titulo}"