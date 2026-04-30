"""from django.db import models


class Rol(models.Model):
    nombre = models.CharField(max_length=10, unique=True)
    descripcion = models.CharField()

    def _str_(self):
     return self.nombre"""

from django.db import models


class Rol(models.Model):
    rol_id = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=50, unique=True)
    descripcion = models.CharField(max_length=255, null=True, blank=True)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'roles'

    def __str__(self):
        return f"{self.nombre_rol} ({'Activo' if self.estado else 'Inactivo'})"