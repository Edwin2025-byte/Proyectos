from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Entrega
from ..serializers import EntregaSerializer, EntregaCalificarSerializer


class EntregaViewSet(viewsets.ModelViewSet):
    queryset = Entrega.objects.all()
    serializer_class = EntregaSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['estudiante__usuario__nombre_completo', 'tarea__titulo']
    ordering_fields = ['nota', 'xp_ganada', 'fecha_entrega', 'fecha_creacion']
    ordering = ['-fecha_creacion']

    def get_queryset(self):
        queryset = super().get_queryset()
        tarea_id = self.request.query_params.get('tarea_id')
        estudiante_id = self.request.query_params.get('estudiante_id')
        estado = self.request.query_params.get('estado_entrega')
        if tarea_id:
            queryset = queryset.filter(tarea_id=tarea_id)
        if estudiante_id:
            queryset = queryset.filter(estudiante_id=estudiante_id)
        if estado:
            queryset = queryset.filter(estado_entrega=estado)
        return queryset

    @action(detail=True, methods=['patch'], url_path='calificar')
    def calificar(self, request, pk=None):
        entrega = self.get_object()
        serializer = EntregaCalificarSerializer(entrega, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # Recargar con el serializer completo para la respuesta
            return Response(EntregaSerializer(entrega).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='pendientes')
    def pendientes(self, request):
        entregas = self.queryset.filter(estado_entrega='Pendiente')
        serializer = self.get_serializer(entregas, many=True)
        return Response(serializer.data)