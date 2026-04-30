from pathlib import Path

# Directorio base
BASE_DIR = Path(__file__).resolve().parent.parent

# SEGURIDAD
SECRET_KEY = 'django-insecure-=ipx^py^tke_el!i)*(ziz9xsrr$8rtqv0vz8fq^a)-&i=!3wy'
DEBUG = True

# Permitimos '*' para que el celular no tenga bloqueos de red
ALLOWED_HOSTS = ['*', 'localhost', '127.0.0.1']

# APLICACIONES REGISTRADAS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',      # API Toolkit
    'corsheaders',         # Para conectar con el celular
    'miApp',               # Tu lógica de negocio
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # Indispensable para que el celular lea la API
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'pruebaServ.urls'

# Permitir que cualquier dispositivo (frontend/celular) pida datos
CORS_ALLOW_ALL_ORIGINS = True 

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'pruebaServ.wsgi.application'

# BASE DE DATOS (CONEXIÓN CORREGIDA A TU DOCKER)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'prueba',        # Según tus datos anteriores
        'USER': 'edwin',         # El usuario que te pertenece
        'PASSWORD': 'edwin123',  # Tu contraseña real
        'HOST': '127.0.0.1',     # IP local para conectar desde Windows a Docker
        'PORT': '5432',
    }
}

# VALIDACIÓN DE CONTRASEÑAS
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# INTERNACIONALIZACIÓN
LANGUAGE_CODE = 'es-es'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ARCHIVOS ESTÁTICOS Y CONFIGURACIÓN FINAL
STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'