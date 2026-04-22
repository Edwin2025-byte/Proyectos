from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Plan
from ..serializers import PlanSerializer


class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nombre_plan', 'descripcion']
    ordering_fields = ['precio', 'limite_cursos', 'fecha_creacion']
    ordering = ['precio']