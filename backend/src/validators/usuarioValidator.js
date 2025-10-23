const Joi = require('joi');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

// Schema para registro de usuário
const registerSchema = Joi.object({
  nome: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Nome deve ter pelo menos 2 caracteres',
      'string.max': 'Nome deve ter no máximo 100 caracteres',
      'any.required': 'Nome é obrigatório'
    }),
  
  pronome: Joi.string()
    .max(20)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Pronome deve ter no máximo 20 caracteres'
    }),
  
  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages({
      'string.pattern.base': 'Email deve ter um formato válido',
      'any.required': 'Email é obrigatório'
    }),
  
  senha: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Senha deve ter pelo menos 6 caracteres',
      'any.required': 'Senha é obrigatória'
    }),
  
  telefone: Joi.string()
    .pattern(phoneRegex)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Telefone deve estar no formato (XX) XXXXX-XXXX'
    }),
  
  data_nascimento: Joi.date()
    .max('now')
    .optional()
    .messages({
      'date.max': 'Data de nascimento não pode ser futura'
    }),
  
  cpf: Joi.string()
    .pattern(cpfRegex)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'CPF deve estar no formato XXX.XXX.XXX-XX'
    })
});

// Schema para login
const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages({
      'string.pattern.base': 'Email deve ter um formato válido',
      'any.required': 'Email é obrigatório'
    }),
  
  senha: Joi.string()
    .required()
    .messages({
      'any.required': 'Senha é obrigatória'
    })
});

// Schema para atualização de usuário
const updateSchema = Joi.object({
  nome: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.min': 'Nome deve ter pelo menos 2 caracteres',
      'string.max': 'Nome deve ter no máximo 100 caracteres'
    }),
  
  pronome: Joi.string()
    .max(20)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Pronome deve ter no máximo 20 caracteres'
    }),
  
  email: Joi.string()
    .pattern(emailRegex)
    .optional()
    .messages({
      'string.pattern.base': 'Email deve ter um formato válido'
    }),
  
  telefone: Joi.string()
    .pattern(phoneRegex)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Telefone deve estar no formato (XX) XXXXX-XXXX'
    }),
  
  data_nascimento: Joi.date()
    .max('now')
    .optional()
    .messages({
      'date.max': 'Data de nascimento não pode ser futura'
    }),
  
  cpf: Joi.string()
    .pattern(cpfRegex)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'CPF deve estar no formato XXX.XXX.XXX-XX'
    })
});

// Schema para mudança de senha
const changePasswordSchema = Joi.object({
  senha_atual: Joi.string()
    .required()
    .messages({
      'any.required': 'Senha atual é obrigatória'
    }),
  
  nova_senha: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Nova senha deve ter pelo menos 6 caracteres',
      'any.required': 'Nova senha é obrigatória'
    })
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSchema,
  changePasswordSchema
};