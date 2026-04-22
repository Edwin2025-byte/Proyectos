# Usamos la imagen oficial de Node 24 (basada en Alpine para ligereza)
FROM node:24.14.1-slim

# Directorio de trabajo
WORKDIR /app

# Instalamos bash y dependencias mínimas de sistema
RUN apt-get update && apt-get install -y \
    git \
    watchman \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copiamos archivos de dependencias
COPY package.json package-lock.json* ./

# Instalamos expo-cli de forma global
RUN npm install -g expo-cli

# Instalamos las dependencias del proyecto
# Usamos --legacy-peer-deps por si alguna librería de Expo aún no se marca como 
# compatible oficialmente con Node 24
RUN npm install

# Copiamos el resto del código
COPY . .

# Puertos de Metro Bundler y Expo Web
EXPOSE 8081
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

#PARA QUE LA EXPO ACEPTE CONEXIONES EXTERNAS (MOVIL VIA QR)
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

# Comando de inicio
CMD ["npm","start"]