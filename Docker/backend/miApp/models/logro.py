from django.db import models


class Logro(models.Model):
    logro_id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)
    icono_url = models.CharField(max_length=255, null=True, blank=True)
    color = models.CharField(max_length=7, default='#FFD700')
    puntos_premio = models.IntegerField(default=50)
    es_exclusivo_pro = models.BooleanField(default=False)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'logros'

    def __str__(self):
        pro_str = " [PRO]" if self.es_exclusivo_pro else ""
        return f"{self.titulo}{pro_str} (+{self.puntos_premio} pts)"