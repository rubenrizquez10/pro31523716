const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
require('dotenv').config();

const { sequelize } = require('./config/database');

// Import models and associations
const models = require('./models'); // This will load all models and define associations

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const tagRoutes = require('./routes/tags');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const { getPublicProduct } = require('./controllers/productController');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
// app.use(helmet()); // Comentado para evitar conflictos CORS en producción
app.use(cors({
  origin: true, // Permitir todas las origins en desarrollo
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware de logging
app.use(morgan('combined'));

// Middleware de parsing del cuerpo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Security Project',
      version: '1.0.0',
      description: 'RESTful API with security and data management',
    },
    // servers: [
    //   {
    //     url: process.env.NODE_ENV === 'production'
    //       ? 'https://your-app.onrender.com'
    //       : `http://localhost:${PORT}`,
    //     description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
    //   },
    // ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Servir archivos estáticos (imágenes)
app.use(express.static(path.join(__dirname, '..')));

// Rutas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Public product route (must be before /products to avoid conflicts)
app.get('/p/:idSlug', getPublicProduct);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/tags', tagRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Endpoint de verificación de salud
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'La API está funcionando',
    timestamp: new Date().toISOString(),
  });
});

// Servir archivos estáticos del frontend
const staticPath = path.join(__dirname, '../client/dist');
if (process.env.NODE_ENV === 'production' && require('fs').existsSync(staticPath)) {
  app.use(express.static(staticPath));
  
  // Rutas para frontend SPA
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/p/') && !req.path.startsWith('/api-docs') && !req.path.startsWith('/health')) {
      res.sendFile(path.join(staticPath, 'index.html'));
    }
  });
} else if (process.env.NODE_ENV !== 'test') {
  // En desarrollo (no test), retornar JSON para rutas no encontradas que no son API
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/p/') && !req.path.startsWith('/api-docs') && !req.path.startsWith('/health')) {
      res.status(404).json({
        status: 'fail',
        message: 'Ruta no encontrada',
      });
    }
  });
}

// Manejador 404 para rutas API
app.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Ruta API no encontrada',
  });
});

// Manejador 404 para rutas públicas de productos
app.use('/p/*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Producto no encontrado',
  });
});

// Manejador 404 general para test y casos especiales
if (process.env.NODE_ENV === 'test') {
  app.use('*', (req, res) => {
    res.status(404).json({
      status: 'fail',
      message: 'Ruta no encontrada',
    });
  });
}

// Middleware de manejo de errores
app.use(errorHandler);

// Conexión a la base de datos e inicio del servidor
const startServer = async () => {
  try {
    await models.sequelize.authenticate(); // Use models.sequelize
    console.log('Conexión a la base de datos establecida exitosamente.');
    
    // Sincronizar base de datos (crear tablas si no existen)
    await models.sequelize.sync({ force: false }); // Use models.sequelize
    console.log('Base de datos sincronizada exitosamente.');
    
    // Asegurar productos predeterminados
    const { ensureDefaultData } = require('../scripts/ensureDefaultProducts');
    await ensureDefaultData();
    
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
      console.log(`Documentación de API disponible en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
};

// Iniciar el servidor solo si no está en entorno de prueba
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
