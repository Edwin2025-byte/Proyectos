from django.db import models
from .curso import Curso


class Tema(models.Model):
    tema_id = models.AutoField(primary_key=True)
    curso = models.ForeignKey(
        Curso, 
        on_delete=models.CASCADE, 
        db_column='curso_id'
    )
    nombre_tema = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)
    orden = models.IntegerField(default=0)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'temas'
        ordering = ['orden']

    def __str__(self):
        return f"{self.orden}. {self.nombre_tema} ({self.curso.nombre_clase})"