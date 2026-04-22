from django.db import models


class Plan(models.Model):
    plan_id = models.AutoField(primary_key=True)
    nombre_plan = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(null=True, blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    limite_cursos = models.IntegerField(default=3)
    limite_estudiantes = models.IntegerField(default=30)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'planes'

    def __str__(self):
        return f"{self.nombre_plan} - ${self.precio}"