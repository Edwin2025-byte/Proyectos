from django.db import models
from .rol import Rol
from .plan import Plan

class Usuario(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    rol = models.ForeignKey(
        Rol, 
        on_delete=models.CASCADE, 
        db_column='rol_id'
    )
    plan = models.ForeignKey(
        Plan, 
        on_delete=models.SET_NULL,
        null=True, 
        blank=True,
        db_column='plan_id'
    )
    email = models.EmailField(unique=True)
    password_hash = models.TextField()
    nombre_completo = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, null=True, blank=True)
    activo = models.BooleanField(default=True)
    
    # --- CAMPOS DE GAMIFICACIÓN AGREGADOS ---
    xp = models.IntegerField(default=0)
    nivel = models.IntegerField(default=1)
    # ----------------------------------------

    fecha_ultimo_acceso = models.DateTimeField(null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'usuarios'

    def __str__(self):
        # Usamos un try/except por si el rol no está cargado al momento de imprimir
        try:
            rol_nombre = self.rol.nombre_rol
        except:
            rol_nombre = "Sin Rol"
        return f"{self.nombre_completo} ({self.email}) - {rol_nombre}"