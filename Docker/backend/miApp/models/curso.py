from django.db import models
from .profesor import Profesor


class Curso(models.Model):
    curso_id = models.AutoField(primary_key=True)
    profesor = models.ForeignKey(
        Profesor, 
        on_delete=models.CASCADE, 
        db_column='profesor_id'
    )
    nombre_clase = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)
    codigo_acceso = models.CharField(max_length=10, unique=True)
    imagen_url = models.CharField(max_length=255, null=True, blank=True)
    duracion_horas = models.IntegerField(default=0)
    es_premium = models.BooleanField(default=False)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'cursos'

    def __str__(self):
        return f"{self.nombre_clase} ({'Premium' if self.es_premium else 'Gratuito'}) - Código: {self.codigo_acceso}"