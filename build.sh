#!/bin/bash

echo "🚀 Iniciando build para Render..."

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
npm install

# Ir al directorio del cliente e instalar dependencias
echo "📦 Instalando dependencias del cliente..."
cd client
npm install

# Construir el cliente
echo "🔨 Construyendo el cliente..."
npm run build

# Volver al directorio raíz
cd ..

echo "✅ Build completado exitosamente!"