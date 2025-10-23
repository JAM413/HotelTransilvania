const { verifyToken } = require('../config/auth');
const Usuario = require('../models/Usuario');

// Middleware para verificar autenticação
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso não fornecido'
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer "
    
    // Verificar token
    const decoded = verifyToken(token);
    
    // Buscar usuário
    const usuario = await Usuario.buscarPorId(decoded.id);
    
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    if (!usuario.active) {
      return res.status(401).json({
        success: false,
        message: 'Usuário desativado'
      });
    }

    // Adicionar usuário ao request
    req.user = usuario;
    req.userId = usuario.id;
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado'
    });
  }
};

// Middleware opcional para autenticação (não retorna erro se não autenticado)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    const usuario = await Usuario.buscarPorId(decoded.id);
    
    if (usuario && usuario.active) {
      req.user = usuario;
      req.userId = usuario.id;
    }
    
    next();
  } catch (error) {
    // Se houver erro, continua sem autenticação
    next();
  }
};

// Middleware para verificar se é o próprio usuário ou admin
const authorize = (req, res, next) => {
  const { id } = req.params;
  const userId = req.userId;

  // Se for o próprio usuário, permite
  if (id === userId) {
    return next();
  }

  // Aqui você pode adicionar lógica para verificar se é admin
  // Por enquanto, vamos permitir apenas o próprio usuário
  return res.status(403).json({
    success: false,
    message: 'Acesso negado. Você só pode acessar seus próprios dados.'
  });
};

module.exports = {
  authenticate,
  optionalAuth,
  authorize
};