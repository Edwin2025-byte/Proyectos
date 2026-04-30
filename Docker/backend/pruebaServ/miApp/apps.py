from django.apps import AppConfig

class MiappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'miApp'

    def ready(self):
        # El punto (.) le dice a Django: "Busca el archivo signals en esta misma carpeta"
        # Esto soluciona el error ModuleNotFoundError
        from . import signals