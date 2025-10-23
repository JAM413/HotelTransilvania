const Usuario = require('../models/Usuario');
const { generateToken } = require('../config/auth');

class AuthController {
  // Registrar novo usuário
  static async register(req, res, next) {
    try {
      const { nome, pronome, email, senha, telefone, data_nascimento, cpf } = req.body;

      // Criar usuário
      const usuario = await Usuario.criar({
        nome,
        pronome,
        email,
        senha,
        telefone,
        data_nascimento,
        cpf
      });

      // Gerar token
      const token = generateToken({
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome
      });

      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: {
          usuario: usuario.toJSON(),
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Login do usuário
  static async login(req, res, next) {
    try {
      const { email, senha } = req.body;

      // Buscar usuário por email
      const usuario = await Usuario.buscarPorEmail(email);

      if (!usuario) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha incorretos'
        });
      }

      // Verificar senha
      const senhaValida = await usuario.verificarSenha(senha);

      if (!senhaValida) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha incorretos'
        });
      }

      // Verificar se usuário está ativo
      if (!usuario.active) {
        return res.status(401).json({
          success: false,
          message: 'Usuário desativado'
        });
      }

      // Gerar token
      const token = generateToken({
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome
      });

      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          usuario: usuario.toJSON(),
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Obter perfil do usuário autenticado
  static async getProfile(req, res, next) {
    try {
      const usuario = req.user;

      res.json({
        success: true,
        data: {
          usuario: usuario.toJSON()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Verificar se token é válido
  static async verifyToken(req, res, next) {
    try {
      // Se chegou até aqui, o token é válido (middleware authenticate já validou)
      res.json({
        success: true,
        message: 'Token válido',
        data: {
          usuario: req.user.toJSON()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Logout (no JWT, logout é feito no frontend removendo o token)
  static async logout(req, res, next) {
    try {
      res.json({
        success: true,
        message: 'Logout realizado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;