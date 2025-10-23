import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateRegisterForm, formatPhone, formatCPF } from '../utils/validation';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, CreditCard } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    pronome: '',
    email: '',
    senha: '',
    telefone: '',
    data_nascimento: '',
    cpf: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatar campos específicos
    if (name === 'telefone') {
      formattedValue = formatPhone(value);
    } else if (name === 'cpf') {
      formattedValue = formatCPF(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulário
    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setLoading(true);
      await register(formData);
      navigate('/');
    } catch (error) {
      console.error('Erro no registro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              entre com sua conta existente
            </Link>
          </p>
        </div>

        {/* Form */}
        <div className="card p-8 fade-in">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="form-group">
              <label htmlFor="nome" className="form-label">
                Nome completo *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.nome ? 'input-error' : ''}`}
                  placeholder="Seu nome completo"
                />
              </div>
              {errors.nome && (
                <p className="form-error">{errors.nome}</p>
              )}
            </div>

            {/* Pronome */}
            <div className="form-group">
              <label htmlFor="pronome" className="form-label">
                Pronome (opcional)
              </label>
              <input
                id="pronome"
                name="pronome"
                type="text"
                value={formData.pronome}
                onChange={handleChange}
                className="input-field"
                placeholder="ex: ele/dele, ela/dela, elu/delu"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.email ? 'input-error' : ''}`}
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && (
                <p className="form-error">{errors.email}</p>
              )}
            </div>

            {/* Senha */}
            <div className="form-group">
              <label htmlFor="senha" className="form-label">
                Senha *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="senha"
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.senha}
                  onChange={handleChange}
                  className={`input-field pl-10 pr-10 ${errors.senha ? 'input-error' : ''}`}
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.senha && (
                <p className="form-error">{errors.senha}</p>
              )}
            </div>

            {/* Telefone */}
            <div className="form-group">
              <label htmlFor="telefone" className="form-label">
                Telefone (opcional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.telefone}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.telefone ? 'input-error' : ''}`}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
              </div>
              {errors.telefone && (
                <p className="form-error">{errors.telefone}</p>
              )}
            </div>

            {/* Data de Nascimento */}
            <div className="form-group">
              <label htmlFor="data_nascimento" className="form-label">
                Data de nascimento (opcional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="data_nascimento"
                  name="data_nascimento"
                  type="date"
                  value={formData.data_nascimento}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.data_nascimento ? 'input-error' : ''}`}
                />
              </div>
              {errors.data_nascimento && (
                <p className="form-error">{errors.data_nascimento}</p>
              )}
            </div>

            {/* CPF */}
            <div className="form-group">
              <label htmlFor="cpf" className="form-label">
                CPF (opcional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.cpf ? 'input-error' : ''}`}
                  placeholder="123.456.789-00"
                  maxLength={14}
                />
              </div>
              {errors.cpf && (
                <p className="form-error">{errors.cpf}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="spinner mr-2"></div>
                    Criando conta...
                  </>
                ) : (
                  'Criar conta'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Terms */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link to="/terms" className="text-blue-600 hover:text-blue-500">
              Termos de Serviço
            </Link>{' '}
            e{' '}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
