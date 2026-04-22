from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Usuario
from ..serializers import UsuarioSerializer, UsuarioCreateSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['email', 'nombre_completo', 'telefono']
    ordering_fields = ['fecha_creacion', 'nombre_completo']
    ordering = ['-fecha_creacion']

    def get_serializer_class(self):
        if self.action == 'create':
            return UsuarioCreateSerializer
        return UsuarioSerializer

    @action(detail=False, methods=['get'], url_path='por-rol')
    def por_rol(self, request):
        rol_id = request.query_params.get('rol_id')
        if not rol_id:
            return Response({'error': 'rol_id es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        usuarios = self.queryset.filter(rol_id=rol_id, activo=True)
        serializer = self.get_serializer(usuarios, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='activos')
    def activos(self, request):
        usuarios = self.queryset.filter(activo=True)
        serializer = self.get_serializer(usuarios, many=True)
        return Response(serializer.data)