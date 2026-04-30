# miApp/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RolViewSet, PlanViewSet, UsuarioViewSet, ProfesorViewSet,
    EstudianteViewSet, CursoViewSet, InscripcionViewSet,
    TemaViewSet, TareaViewSet, EntregaViewSet,
    LogroViewSet, EstudianteLogroViewSet, PagoViewSet,
    RankingViewSet, # <--- AGREGADO AQUÍ
)

router = DefaultRouter()
router.register(r'roles', RolViewSet)
router.register(r'planes', PlanViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'profesores', ProfesorViewSet)
router.register(r'estudiantes', EstudianteViewSet)
router.register(r'cursos', CursoViewSet)
router.register(r'inscripciones', InscripcionViewSet)
router.register(r'temas', TemaViewSet)
router.register(r'tareas', TareaViewSet)
router.register(r'entregas', EntregaViewSet)
router.register(r'logros', LogroViewSet)
router.register(r'estudiante-logros', EstudianteLogroViewSet)
router.register(r'pagos', PagoViewSet)
router.register(r'ranking', RankingViewSet, basename='ranking') # <--- AGREGADO AQUÍ

urlpatterns = [
    path('', include(router.urls)),
]