const Usuario = require('../models/Usuario');

class UsuarioController {
  // Listar usuários
  static async listar(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';

      const result = await Usuario.listar(page, limit, search);

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  // Buscar usuário por ID
  static async buscarPorId(req, res, next) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

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

  // Atualizar usuário
  static async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Buscar usuário
      const usuario = await Usuario.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Atualizar usuário
      await usuario.atualizar(updateData);

      res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: {
          usuario: usuario.toJSON()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Alterar senha
  static async alterarSenha(req, res, next) {
    try {
      const { id } = req.params;
      const { senha_atual, nova_senha } = req.body;

      // Buscar usuário
      const usuario = await Usuario.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Alterar senha
      await usuario.alterarSenha(senha_atual, nova_senha);

      res.json({
        success: true,
        message: 'Senha alterada com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  // Desativar usuário
  static async desativar(req, res, next) {
    try {
      const { id } = req.params;
      const deletedBy = req.userId; // ID do usuário que está fazendo a desativação

      // Buscar usuário
      const usuario = await Usuario.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Desativar usuário
      await usuario.desativar(deletedBy);

      res.json({
        success: true,
        message: 'Usuário desativado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  // Ativar usuário (se necessário)
  static async ativar(req, res, next) {
    try {
      const { id } = req.params;

      // Buscar usuário (incluindo inativos)
      const { supabaseAdmin } = require('../config/database');
      const { data: usuario, error } = await supabaseAdmin
        .from('usuario')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Ativar usuário
      const { data: updatedUser, error: updateError } = await supabaseAdmin
        .from('usuario')
        .update({
          active: true,
          deleted_at: null,
          deleted_by: null
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        throw new Error(`Erro ao ativar usuário: ${updateError.message}`);
      }

      res.json({
        success: true,
        message: 'Usuário ativado com sucesso',
        data: {
          usuario: new Usuario(updatedUser).toJSON()
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsuarioController;