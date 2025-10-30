# 🚀 Sistema de Usuários - Frontend + Backend

Sistema completo de gerenciamento de usuários com autenticação JWT, desenvolvido com React (frontend) e Node.js/Express (backend), utilizando Supabase como banco de dados.

## 📋 Características

### Backend
- ✅ API RESTful com Express
- ✅ Autenticação JWT
- ✅ Hash de senhas com bcrypt
- ✅ Validação com Joi
- ✅ Rate limiting
- ✅ Segurança com Helmet
- ✅ CORS configurável
- ✅ Health check endpoint
- ✅ Logs com Morgan

### Frontend
- ✅ Interface moderna com React
- ✅ Rotas protegidas
- ✅ Autenticação com contexto
- ✅ Validação de formulários
- ✅ Notificações com Toast
- ✅ Design responsivo
- ✅ Ícones com Lucide React

### Banco de Dados
- ✅ Supabase (PostgreSQL)
- ✅ Cliente público e administrativo
- ✅ Row Level Security

## 🏗️ Estrutura do Projeto

```
.
├── backend/
│   ├── src/
│   │   ├── config/        # Configurações (auth, database)
│   │   ├── controllers/   # Lógica de negócio
│   │   ├── middleware/    # Middlewares customizados
│   │   ├── models/        # Modelos de dados
│   │   ├── routes/        # Rotas da API
│   │   ├── validators/    # Validações com Joi
│   │   └── server.js      # Servidor Express
│   ├── package.json
│   └── env.example
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── contexts/      # Context API
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── services/      # Chamadas à API
│   │   └── utils/         # Utilitários
│   ├── package.json
│   └── env.example
├── render.yaml            # Configuração para deploy no Render
└── DEPLOY.md             # Guia completo de deploy
```

## 🚀 Instalação Local

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp env.example .env
```

4. Edite o arquivo `.env` com suas credenciais do Supabase

5. Inicie o servidor:
```bash
npm run dev
```

O backend estará rodando em `http://localhost:3000`

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp env.example .env
```

4. Edite o arquivo `.env` com a URL do backend:
```
REACT_APP_API_URL=http://localhost:3000/api
```

5. Inicie a aplicação:
```bash
npm start
```

O frontend estará rodando em `http://localhost:3000`

## 🌐 Deploy no Render

Siga o guia completo em [DEPLOY.md](DEPLOY.md) para fazer o deploy no Render.

**Resumo rápido:**
1. Faça push do código para um repositório Git
2. No Render Dashboard, crie um Blueprint usando o `render.yaml`
3. Configure as variáveis de ambiente
4. Deploy automático!

## 📚 Documentação da API

### Autenticação

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Obter perfil do usuário
- `GET /api/auth/verify` - Verificar token
- `POST /api/auth/logout` - Logout

### Usuários

- `GET /api/usuarios` - Listar usuários
- `GET /api/usuarios/:id` - Buscar usuário por ID
- `PUT /api/usuarios/:id` - Atualizar usuário
- `PUT /api/usuarios/:id/change-password` - Alterar senha
- `DELETE /api/usuarios/:id` - Desativar usuário
- `PUT /api/usuarios/:id/activate` - Ativar usuário

### Health Check

- `GET /health` - Verificar status da API

## 🔐 Variáveis de Ambiente

### Backend

| Variável | Descrição |
|----------|-----------|
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_ANON_KEY` | Chave pública do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço do Supabase |
| `JWT_SECRET` | Secret para assinatura JWT |
| `JWT_EXPIRES_IN` | Tempo de expiração do token |
| `PORT` | Porta do servidor |
| `NODE_ENV` | Ambiente (development/production) |
| `FRONTEND_URL` | URL do frontend (para CORS) |
| `RATE_LIMIT_WINDOW_MS` | Janela de rate limiting |
| `RATE_LIMIT_MAX_REQUESTS` | Máximo de requests |

### Frontend

| Variável | Descrição |
|----------|-----------|
| `REACT_APP_API_URL` | URL da API backend |
| `REACT_APP_NODE_ENV` | Ambiente (development/production) |

## 🛠️ Tecnologias

### Backend
- Node.js
- Express
- Supabase
- JWT
- bcrypt
- Joi
- Helmet
- Morgan
- Express Rate Limit

### Frontend
- React
- React Router DOM
- Axios
- React Hook Form
- React Hot Toast
- Tailwind CSS
- Lucide React

## 📝 Licença

MIT

