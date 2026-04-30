# Usamos la imagen oficial de Python 3.14 (Release Candidate/Slim para menor tamaño)
FROM python:3.14-slim

# Evita que Python genere archivos .pyc y permite que los logs se vean en tiempo real
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalación de dependencias del sistema necesarias para:
# - psycopg2 (PostgreSQL)
# - Herramientas de compilación
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalación de dependencias de Python
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto del código del proyecto
COPY . .

# Exponemos el puerto por defecto de Django
EXPOSE 8000

# Comando para ejecutar el servidor de desarrollo
# Nota: En producción se recomienda usar Gunicorn
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]