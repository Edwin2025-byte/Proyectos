from django.db import models
from .estudiante import Estudiante
from .logro import Logro

class EstudianteLogro(models.Model):
    # 'estudiante_id' y 'logro_id' son los nombres en tus tablas de pgAdmin
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
        return f"Logro {self.logro.titulo} para {self.estudiante.usuario.nombre_completo}"