from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from ..models import Estudiante
from ..serializers import EstudianteSerializer, EstudianteRankingSerializer


class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['usuario__nombre_completo', 'usuario__email']
    ordering_fields = ['xp_actual', 'puntos_oro', 'nivel', 'fecha_creacion']
    ordering = ['-xp_actual']

    @action(detail=False, methods=['get'], url_path='ranking')
    def ranking(self, request):
        top = self.queryset.filter(estado=True).order_by('-xp_actual')[:50]
        serializer = EstudianteRankingSerializer(top, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='agregar-xp')
    def agregar_xp(self, request, pk=None):
        estudiante = self.get_object()
        xp = request.data.get('xp', 0)
        try:
            xp = int(xp)
            if xp < 0:
                raise ValueError
        except ValueError:
            return Response({'error': 'xp debe ser un número positivo'}, status=status.HTTP_400_BAD_REQUEST)
        
        estudiante.xp_actual += xp
        estudiante.save()
        serializer = self.get_serializer(estudiante)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='agregar-oro')
    def agregar_oro(self, request, pk=None):
        estudiante = self.get_object()
        puntos = request.data.get('puntos', 0)
        try:
            puntos = int(puntos)
            if puntos < 0:
                raise ValueError
        except ValueError:
            return Response({'error': 'puntos debe ser un número positivo'}, status=status.HTTP_400_BAD_REQUEST)
        
        estudiante.puntos_oro += puntos
        estudiante.save()
        serializer = self.get_serializer(estudiante)
        return Response(serializer.data)