from django.db import models
from .tema import Tema


class Tarea(models.Model):
    TIPO_TAREA_CHOICES = [
        ('Normal', 'Normal'),
        ('Quiz', 'Quiz'),
        ('Proyecto', 'Proyecto'),
        ('Foro', 'Foro de Discusión'),
    ]
    
    tarea_id = models.AutoField(primary_key=True)
    tema = models.ForeignKey(
        Tema, 
        on_delete=models.CASCADE, 
        db_column='tema_id'
    )
    titulo = models.CharField(max_length=150)
    descripcion = models.TextField(null=True, blank=True)
    tipo_tarea = models.CharField(
        max_length=20, 
        choices=TIPO_TAREA_CHOICES, 
        default='Normal'
    )
    xp_recompensa = models.IntegerField(default=100)
    archivo_adjunto = models.BooleanField(default=False)
    fecha_limite = models.DateTimeField(null=True, blank=True)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'tareas'

    def __str__(self):
        return f"{self.titulo} ({self.tipo_tarea}) - {self.xp_recompensa} XP"