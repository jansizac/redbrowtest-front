# RedBrowTest-Front

Este proyecto es una aplicación web construida con React. Aquí encontrarás las instrucciones para ejecutar la aplicación tanto en un entorno de desarrollo local como en un contenedor Docker.

## Requisitos Previos

Para ejecutar esta aplicación, necesitarás tener instalado:

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/) (generalmente se instala con Node.js)
- [Docker](https://www.docker.com/) (para ejecución en contenedor)

## Instalación y Ejecución Local

Sigue estos pasos para ejecutar la aplicación en tu máquina local:

1. **Clonar el Repositorio:**

   ```bash
   git clone git@github.com:jansizac/redbrowtest-front.git
   cd redbrowtest-front
   ```

2. **Instalar dependencias**


   ```bash
   npm install
   ```

2. **Ejecutar la aplicación**


   ```bash
   npm start
   ```
   Esto iniciará la aplicación en modo de desarrollo. Abre http://localhost:3000 para verla en el navegador.

## Ejecución usando docker
Para ejecutar la aplicación en un contenedor Docker, sigue estos pasos una vez que hayas clonado el respositorio:


1. **Construir la Imagen de Docker:**

En la raíz del proyecto, ejecuta:

   ```bash
   docker build -t redbrowtest-front .
   ```

   Esto construirá una imagen de Docker para tu aplicación usando el **Dockerfile** proporcionado.

2. **Ejecutar la Imagen en un Contenedor:**

   ```bash
   docker run -p 8080:80 redbrowtest-front
   ```
   
Esto iniciará un contenedor Docker ejecutando tu aplicación y mapeará el puerto 8080 de tu máquina local al puerto 80 del contenedor.

Ahora puedes acceder a la aplicación en http://localhost:8080.

El usuario con el que podras hacer pruebas es: admin@mail.com y el password es 123456
