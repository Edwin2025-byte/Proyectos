from .rol_serializer import RolSerializer
from .plan_serializer import PlanSerializer
from .usuario_serializer import UsuarioSerializer, UsuarioCreateSerializer 
from .profesor_serializer import ProfesorSerializer
from .estudiante_serializer import EstudianteSerializer, EstudianteRankingSerializer
from .curso_serializer import CursoSerializer
from .inscripcion_serializer import InscripcionSerializer
from .tema_serializer import TemaSerializer
from .tarea_serializer import TareaSerializer
# Asegúrate de que esta línea tenga los dos nombres exactos:
from .entrega_serializer import EntregaSerializer, EntregaCalificarSerializer
from .logro_serializer import LogroSerializer
from .estudiante_logro_serializer import EstudianteLogroSerializer
from .pago_serializer import PagoSerializer