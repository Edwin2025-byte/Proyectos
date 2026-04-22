from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter
from django.db import IntegrityError
from ..models import Inscripcion
from ..serializers import InscripcionSerializer


class InscripcionViewSet(viewsets.ModelViewSet):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ['fecha_creacion']
    ordering = ['-fecha_creacion']

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            return Response(
                {'error': 'El estudiante ya está inscrito en este curso'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def get_queryset(self):
        queryset = super().get_queryset()
        curso_id = self.request.query_params.get('curso_id')
        estudiante_id = self.request.query_params.get('estudiante_id')
        if curso_id:
            queryset = queryset.filter(curso_id=curso_id)
        if estudiante_id:
            queryset = queryset.filter(estudiante_id=estudiante_id)
        return queryset