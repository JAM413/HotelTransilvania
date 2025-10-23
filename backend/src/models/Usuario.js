const { supabaseAdmin } = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.pronome = data.pronome;
    this.email = data.email;
    this.senha = data.senha;
    this.telefone = data.telefone;
    this.data_nascimento = data.data_nascimento;
    this.cpf = data.cpf;
    this.created_at = data.created_at;
    this.active = data.active;
    this.deleted_at = data.deleted_at;
    this.deleted_by = data.deleted_by;
  }

  // Criar novo usuário
  static async criar(data) {
    try {
      // Verificar se email já existe
      const { data: existingUser, error: checkError } = await supabaseAdmin
        .from('usuario')
        .select('id')
        .eq('email', data.email)
        .eq('active', true)
        .single();

      if (existingUser) {
        throw new Error('Email já está em uso');
      }

      // Verificar se CPF já existe (se fornecido)
      if (data.cpf) {
        const { data: existingCPF, error: cpfError } = await supabaseAdmin
          .from('usuario')
          .select('id')
          .eq('cpf', data.cpf)
          .eq('active', true)
          .single();

        if (existingCPF) {
          throw new Error('CPF já está em uso');
        }
      }

      // Criptografar senha
      const senhaHash = await bcrypt.hash(data.senha, 12);

      // Preparar dados para inserção
      const userData = {
        nome: data.nome,
        pronome: data.pronome || null,
        email: data.email,
        senha: senhaHash,
        telefone: data.telefone || null,
        data_nascimento: data.data_nascimento || null,
        cpf: data.cpf || null,
        active: true
      };

      // Inserir usuário
      const { data: newUser, error } = await supabaseAdmin
        .from('usuario')
        .insert([userData])
        .select()
        .single();

      if (error) {
        throw new Error(`Erro ao criar usuário: ${error.message}`);
      }

      return new Usuario(newUser);
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuário por email
  static async buscarPorEmail(email) {
    try {
      const { data, error } = await supabaseAdmin
        .from('usuario')
        .select('*')
        .eq('email', email)
        .eq('active', true)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw new Error(`Erro ao buscar usuário: ${error.message}`);
      }

      return data ? new Usuario(data) : null;
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuário por ID
  static async buscarPorId(id) {
    try {
      const { data, error } = await supabaseAdmin
        .from('usuario')
        .select('*')
        .eq('id', id)
        .eq('active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(`Erro ao buscar usuário: ${error.message}`);
      }

      return data ? new Usuario(data) : null;
    } catch (error) {
      throw error;
    }
  }

  // Listar usuários (com paginação)
  static async listar(page = 1, limit = 10, search = '') {
    try {
      const offset = (page - 1) * limit;
      
      let query = supabaseAdmin
        .from('usuario')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      // Adicionar filtro de busca se fornecido
      if (search) {
        query = query.or(`nome.ilike.%${search}%,email.ilike.%${search}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Erro ao listar usuários: ${error.message}`);
      }

      // Contar total de registros
      let countQuery = supabaseAdmin
        .from('usuario')
        .select('*', { count: 'exact', head: true })
        .eq('active', true);

      if (search) {
        countQuery = countQuery.or(`nome.ilike.%${search}%,email.ilike.%${search}%`);
      }

      const { count, error: countError } = await countQuery;

      if (countError) {
        throw new Error(`Erro ao contar usuários: ${countError.message}`);
      }

      return {
        usuarios: data.map(user => new Usuario(user)),
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      };
    } catch (error) {
      throw error;
    }
  }

  // Atualizar usuário
  async atualizar(data) {
    try {
      // Verificar se email já existe em outro usuário
      if (data.email && data.email !== this.email) {
        const { data: existingUser, error: checkError } = await supabaseAdmin
          .from('usuario')
          .select('id')
          .eq('email', data.email)
          .eq('active', true)
          .neq('id', this.id)
          .single();

        if (existingUser) {
          throw new Error('Email já está em uso');
        }
      }

      // Verificar se CPF já existe em outro usuário
      if (data.cpf && data.cpf !== this.cpf) {
        const { data: existingCPF, error: cpfError } = await supabaseAdmin
          .from('usuario')
          .select('id')
          .eq('cpf', data.cpf)
          .eq('active', true)
          .neq('id', this.id)
          .single();

        if (existingCPF) {
          throw new Error('CPF já está em uso');
        }
      }

      // Preparar dados para atualização
      const updateData = {};
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== '') {
          updateData[key] = data[key];
        }
      });

      const { data: updatedUser, error } = await supabaseAdmin
        .from('usuario')
        .update(updateData)
        .eq('id', this.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Erro ao atualizar usuário: ${error.message}`);
      }

      // Atualizar propriedades da instância
      Object.assign(this, updatedUser);
      return this;
    } catch (error) {
      throw error;
    }
  }

  // Alterar senha
  async alterarSenha(senhaAtual, novaSenha) {
    try {
      // Verificar senha atual
      const senhaValida = await bcrypt.compare(senhaAtual, this.senha);
      if (!senhaValida) {
        throw new Error('Senha atual incorreta');
      }

      // Criptografar nova senha
      const novaSenhaHash = await bcrypt.hash(novaSenha, 12);

      // Atualizar senha
      const { data, error } = await supabaseAdmin
        .from('usuario')
        .update({ senha: novaSenhaHash })
        .eq('id', this.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Erro ao alterar senha: ${error.message}`);
      }

      this.senha = novaSenhaHash;
      return this;
    } catch (error) {
      throw error;
    }
  }

  // Verificar senha
  async verificarSenha(senha) {
    return await bcrypt.compare(senha, this.senha);
  }

  // Desativar usuário (soft delete)
  async desativar(deletedBy = null) {
    try {
      const { data, error } = await supabaseAdmin
        .from('usuario')
        .update({
          active: false,
          deleted_at: new Date().toISOString(),
          deleted_by: deletedBy
        })
        .eq('id', this.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Erro ao desativar usuário: ${error.message}`);
      }

      this.active = false;
      this.deleted_at = data.deleted_at;
      this.deleted_by = data.deleted_by;
      return this;
    } catch (error) {
      throw error;
    }
  }

  // Retornar dados públicos (sem senha)
  toJSON() {
    const user = { ...this };
    delete user.senha;
    return user;
  }
}

module.exports = Usuario;