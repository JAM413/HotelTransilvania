const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Importar middlewares
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // máximo 100 requests por IP
  message: {
    success: false,
    message: 'Muitas tentativas. Tente novamente em alguns minutos.'
  }
});

// Configurar CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://hoteltransilvania-1.onrender.com',
  'http://localhost:3000',
  'http://localhost:3001'
].filter(Boolean); // Remove valores undefined/null

const corsOptions = {
  origin: function (origin, callback) {
    // Log para debug
    console.log('CORS - Origin recebida:', origin);
    console.log('CORS - Origens permitidas:', allowedOrigins);
    console.log('CORS - NODE_ENV:', process.env.NODE_ENV);
    
    // Permite requisições sem origem (mobile apps, Postman, etc) em desenvolvimento
    if (!origin && process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // Se não houver origem (alguns navegadores ou requisições diretas)
    if (!origin) {
      return callback(null, true);
    }
    
    // Verifica se a origem está na lista de permitidas
    const isAllowed = allowedOrigins.some(allowed => {
      if (!allowed) return false;
      // Comparação exata ou se a origem começa com a URL permitida
      return origin === allowed || origin.startsWith(allowed);
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.error('CORS bloqueado para origem:', origin);
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization']
};

// Middlewares globais
// Configurar helmet para não bloquear CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false
})); // Segurança
app.use(cors(corsOptions)); // CORS
app.use(morgan('combined')); // Logs
app.use(limiter); // Rate limiting
app.use(express.json({ limit: '10mb' })); // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser URL encoded

// Middleware para adicionar headers de resposta
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 API Docs:`);
  console.log(`   - POST /api/auth/register - Registrar usuário`);
  console.log(`   - POST /api/auth/login - Login do usuário`);
  console.log(`   - GET /api/auth/profile - Perfil do usuário`);
  console.log(`   - GET /api/auth/verify - Verificar token`);
  console.log(`   - POST /api/auth/logout - Logout`);
  console.log(`   - GET /api/usuarios - Listar usuários`);
  console.log(`   - GET /api/usuarios/:id - Buscar usuário por ID`);
  console.log(`   - PUT /api/usuarios/:id - Atualizar usuário`);
  console.log(`   - PUT /api/usuarios/:id/change-password - Alterar senha`);
  console.log(`   - DELETE /api/usuarios/:id - Desativar usuário`);
  console.log(`   - PUT /api/usuarios/:id/activate - Ativar usuário`);
});

module.exports = app;
