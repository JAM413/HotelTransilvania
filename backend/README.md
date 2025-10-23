# API CRUD de Usuários

API completa para cadastro, login e gerenciamento de usuários com autenticação JWT e banco de dados Supabase.

## 🚀 Funcionalidades

- ✅ **Registro de usuários** com validação completa
- ✅ **Login** com autenticação JWT
- ✅ **CRUD completo** de usuários
- ✅ **Validação de dados** com Joi
- ✅ **Autenticação e autorização** com JWT
- ✅ **Criptografia de senhas** com bcrypt
- ✅ **Rate limiting** para segurança
- ✅ **Logs** com Morgan
- ✅ **Tratamento de erros** centralizado
- ✅ **Soft delete** de usuários

## 📋 Pré-requisitos

- Node.js 16+ 
- Conta no Supabase
- NPM ou Yarn

## 🛠️ Instalação

1. **Clone o repositório**
```bash
cd backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env
```

4. **Edite o arquivo `.env`** com suas credenciais do Supabase:
```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
JWT_SECRET=seu_jwt_secret_muito_seguro
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
```

5. **Execute o banco de dados**
Execute o SQL fornecido no Supabase para criar a tabela `usuario`.

6. **Inicie o servidor**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📚 Documentação da API

### Autenticação

#### POST `/api/auth/register`
Registra um novo usuário.

**Body:**
```json
{
  "nome": "João Silva",
  "pronome": "ele/dele",
  "email": "joao@email.com",
  "senha": "senha123",
  "telefone": "(11) 99999-9999",
  "data_nascimento": "1990-01-01",
  "cpf": "123.456.789-00"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "usuario": {
      "id": "uuid",
      "nome": "João Silva",
      "email": "joao@email.com",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token"
  }
}
```

#### POST `/api/auth/login`
Faz login do usuário.

**Body:**
```json
{
  "email": "joao@email.com",
  "senha": "senha123"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "usuario": {
      "id": "uuid",
      "nome": "João Silva",
      "email": "joao@email.com"
    },
    "token": "jwt_token"
  }
}
```

#### GET `/api/auth/profile`
Obtém o perfil do usuário autenticado.

**Headers:**
```
Authorization: Bearer jwt_token
```

### Usuários

#### GET `/api/usuarios`
Lista usuários com paginação.

**Query Parameters:**
- `page` (opcional): Página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10)
- `search` (opcional): Busca por nome ou email

#### GET `/api/usuarios/:id`
Busca usuário por ID.

#### PUT `/api/usuarios/:id`
Atualiza dados do usuário.

**Headers:**
```
Authorization: Bearer jwt_token
```

#### PUT `/api/usuarios/:id/change-password`
Altera a senha do usuário.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Body:**
```json
{
  "senha_atual": "senha_atual",
  "nova_senha": "nova_senha"
}
```

#### DELETE `/api/usuarios/:id`
Desativa o usuário (soft delete).

**Headers:**
```
Authorization: Bearer jwt_token
```

## 🔒 Segurança

- **JWT** para autenticação
- **bcrypt** para criptografia de senhas
- **Rate limiting** para prevenir ataques
- **Validação** rigorosa de dados
- **Headers de segurança** com Helmet
- **CORS** configurado
- **Soft delete** para auditoria

## 🏗️ Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── auth.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── usuarioController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Usuario.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── usuarioRoutes.js
│   ├── validators/
│   │   └── usuarioValidator.js
│   └── server.js
├── package.json
├── env.example
└── README.md
```

## 🧪 Testando a API

Você pode usar o Postman, Insomnia ou qualquer cliente HTTP para testar as rotas.

**Exemplo com curl:**

```bash
# Registrar usuário
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "senha123"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "senha": "senha123"
  }'

# Buscar perfil
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 📝 Notas Importantes

1. **Variáveis de ambiente**: Certifique-se de configurar todas as variáveis necessárias no arquivo `.env`
2. **Banco de dados**: Execute o SQL fornecido no Supabase antes de iniciar a aplicação
3. **JWT Secret**: Use uma chave secreta forte e única em produção
4. **Rate Limiting**: Ajuste os limites conforme necessário para sua aplicação
5. **Logs**: Os logs são salvos no console, configure um sistema de logs para produção

## 🐛 Solução de Problemas

### Erro de conexão com Supabase
- Verifique se as credenciais estão corretas no arquivo `.env`
- Confirme se a URL do Supabase está correta

### Erro de validação
- Verifique se os dados enviados estão no formato correto
- Consulte os schemas de validação no arquivo `usuarioValidator.js`

### Erro de autenticação
- Verifique se o token JWT está sendo enviado corretamente
- Confirme se o token não expirou
