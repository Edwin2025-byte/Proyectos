from django.db import models
from .tarea import Tarea
from .estudiante import Estudiante


class Entrega(models.Model):
    ESTADO_ENTREGA_CHOICES = [
        ('Pendiente', 'Pendiente'),
        ('Enviada', 'Enviada'),
        ('Calificada', 'Calificada'),
        ('Rechazada', 'Rechazada'),
    ]
    
    entrega_id = models.AutoField(primary_key=True)
    tarea = models.ForeignKey(
        Tarea, 
        on_delete=models.CASCADE, 
        db_column='tarea_id'
    )
    estudiante = models.ForeignKey(
        Estudiante, 
        on_delete=models.CASCADE, 
        db_column='estudiante_id'
    )
    archivo_url = models.TextField(null=True, blank=True)
    comentario_profesor = models.TextField(null=True, blank=True)
    nota = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        null=True, 
        blank=True
    )
    xp_ganada = models.IntegerField(default=0)
    estado_entrega = models.CharField(
        max_length=20, 
        choices=ESTADO_ENTREGA_CHOICES, 
        default='Pendiente'
    )
    fecha_entrega = models.DateTimeField(auto_now_add=True)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'entregas'

    def __str__(self):
        nota_str = f" - Nota: {self.nota}" if self.nota else ""
        return f"{self.estudiante.usuario.nombre_completo} - {self.tarea.titulo} ({self.estado_entrega}){nota_str}"