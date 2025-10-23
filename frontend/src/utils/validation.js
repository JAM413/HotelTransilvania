// Validações para formulários

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
export const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

// Validação de email
export const validateEmail = (email) => {
  if (!email) return 'Email é obrigatório';
  if (!emailRegex.test(email)) return 'Email deve ter um formato válido';
  return null;
};

// Validação de senha
export const validatePassword = (password) => {
  if (!password) return 'Senha é obrigatória';
  if (password.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
  return null;
};

// Validação de nome
export const validateName = (name) => {
  if (!name) return 'Nome é obrigatório';
  if (name.length < 2) return 'Nome deve ter pelo menos 2 caracteres';
  if (name.length > 100) return 'Nome deve ter no máximo 100 caracteres';
  return null;
};

// Validação de telefone
export const validatePhone = (phone) => {
  if (!phone) return null; // Telefone é opcional
  if (!phoneRegex.test(phone)) return 'Telefone deve estar no formato (XX) XXXXX-XXXX';
  return null;
};

// Validação de CPF
export const validateCPF = (cpf) => {
  if (!cpf) return null; // CPF é opcional
  if (!cpfRegex.test(cpf)) return 'CPF deve estar no formato XXX.XXX.XXX-XX';
  return null;
};

// Validação de data de nascimento
export const validateBirthDate = (date) => {
  if (!date) return null; // Data é opcional
  const birthDate = new Date(date);
  const today = new Date();
  if (birthDate > today) return 'Data de nascimento não pode ser futura';
  return null;
};

// Formatar telefone
export const formatPhone = (value) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

// Formatar CPF
export const formatCPF = (value) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
};

// Validar formulário de registro
export const validateRegisterForm = (data) => {
  const errors = {};

  const nameError = validateName(data.nome);
  if (nameError) errors.nome = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.senha);
  if (passwordError) errors.senha = passwordError;

  if (data.telefone) {
    const phoneError = validatePhone(data.telefone);
    if (phoneError) errors.telefone = phoneError;
  }

  if (data.cpf) {
    const cpfError = validateCPF(data.cpf);
    if (cpfError) errors.cpf = cpfError;
  }

  if (data.data_nascimento) {
    const dateError = validateBirthDate(data.data_nascimento);
    if (dateError) errors.data_nascimento = dateError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validar formulário de login
export const validateLoginForm = (data) => {
  const errors = {};

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.senha);
  if (passwordError) errors.senha = passwordError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
