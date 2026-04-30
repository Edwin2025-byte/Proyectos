from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Entrega, EstudianteLogro, Estudiante

@receiver(post_save, sender=Entrega)
def actualizar_progreso_estudiante(sender, instance, created, **kwargs):
    # Verificamos que la entrega tenga una calificación asignada
    if instance.calificacion and instance.calificacion > 0:
        estudiante = instance.estudiante
        
        # 1. Sumar la calificación al XP actual
        estudiante.xp += int(instance.calificacion)
        
        # 2. Lógica de Nivel: Cada 500 XP sube un nivel
        estudiante.nivel = (estudiante.xp // 500) + 1
        estudiante.save()

        # 3. Logro automático por excelencia (Si saca 100)
        if instance.calificacion == 100:
            # Asegúrate que el ID 1 exista en tu tabla 'logros' de pgAdmin
            EstudianteLogro.objects.get_or_create(
                estudiante=estudiante,
                logro_id=1, 
                defaults={'estado': True}
            )