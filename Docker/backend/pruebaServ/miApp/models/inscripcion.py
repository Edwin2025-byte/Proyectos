from django.db import models
from .curso import Curso
from .estudiante import Estudiante


class Inscripcion(models.Model):
    inscripcion_id = models.AutoField(primary_key=True)
    curso = models.ForeignKey(
        Curso, 
        on_delete=models.CASCADE, 
        db_column='curso_id'
    )
    estudiante = models.ForeignKey(
        Estudiante, 
        on_delete=models.CASCADE, 
        db_column='estudiante_id'
    )
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'inscripciones'
        unique_together = (('curso', 'estudiante'),)

    def __str__(self):
        return f"{self.estudiante.usuario.nombre_completo} inscrito en {self.curso.nombre_clase}"