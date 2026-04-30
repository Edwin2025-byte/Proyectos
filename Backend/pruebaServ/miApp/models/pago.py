from django.db import models
from .usuario import Usuario


class Pago(models.Model):
    ESTADO_PAGO_CHOICES = [
        ('Pendiente', 'Pendiente'),
        ('Completado', 'Completado'),
        ('Fallido', 'Fallido'),
        ('Reembolsado', 'Reembolsado'),
    ]
    
    pago_id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(
        Usuario, 
        on_delete=models.CASCADE, 
        db_column='usuario_id'
    )
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_pago = models.CharField(max_length=50, null=True, blank=True)
    id_transaccion_externa = models.TextField(null=True, blank=True)
    detalle_pago = models.JSONField(null=True, blank=True)
    estado_pago = models.CharField(
        max_length=20, 
        choices=ESTADO_PAGO_CHOICES, 
        default='Completado'
    )
    fecha_pago = models.DateTimeField(null=True, blank=True)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'pagos'

    def __str__(self):
        return f"Pago #{self.pago_id} - {self.usuario.nombre_completo} - ${self.monto} ({self.estado_pago})"