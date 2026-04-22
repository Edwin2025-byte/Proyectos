from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter
from django.db import IntegrityError
from ..models import EstudianteLogro
from ..serializers import EstudianteLogroSerializer


class EstudianteLogroViewSet(viewsets.ModelViewSet):
    queryset = EstudianteLogro.objects.all()
    serializer_class = EstudianteLogroSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ['fecha_obtencion']
    ordering = ['-fecha_obtencion']

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            return Response(
                {'error': 'El estudiante ya posee este logro'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def get_queryset(self):
        queryset = super().get_queryset()
        estudiante_id = self.request.query_params.get('estudiante_id')
        if estudiante_id:
            queryset = queryset.filter(estudiante_id=estudiante_id)
        return queryset