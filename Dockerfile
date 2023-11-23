# Paso 1: Utilizar una imagen base con Node.js
FROM node:14-alpine as build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json (si está disponible)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar los archivos del proyecto al contenedor
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Paso 2: Preparar la imagen de producción con Nginx
FROM nginx:stable-alpine

# Copiar los archivos estáticos generados al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx cuando se lance el contenedor
CMD ["nginx", "-g", "daemon off;"]
