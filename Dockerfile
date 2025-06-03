# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del backend
RUN npm install

# Copia todo el código fuente del backend
COPY . .

# Expone el puerto donde corre el backend (por ejemplo, 5000)
EXPOSE 5000

# Inicia el servidor backend
CMD ["npm", "start"]
