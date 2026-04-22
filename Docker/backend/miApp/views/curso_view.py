from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Curso
from ..serializers import CursoSerializer


class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nombre_clase', 'descripcion', 'codigo_acceso']
    ordering_fields = ['fecha_creacion', 'nombre_clase', 'es_premium']
    ordering = ['-fecha_creacion']

    @action(detail=False, methods=['get'], url_path='por-profesor')
    def por_profesor(self, request):
        profesor_id = request.query_params.get('profesor_id')
        if not profesor_id:
            return Response({'error': 'profesor_id es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        cursos = self.queryset.filter(profesor_id=profesor_id, estado=True)
        serializer = self.get_serializer(cursos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='premium')
    def premium(self, request):
        cursos = self.queryset.filter(es_premium=True, estado=True)
        serializer = self.get_serializer(cursos, many=True)
        return Response(serializer.data)
        