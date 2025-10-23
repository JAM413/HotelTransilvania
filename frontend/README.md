# Frontend - Sistema de Usuários

Interface moderna e responsiva para o sistema de gerenciamento de usuários, construída com React e Tailwind CSS.

## 🚀 Funcionalidades

- ✅ **Página de Login** com validação e autenticação
- ✅ **Página de Cadastro** com formulário completo
- ✅ **Dashboard** com informações do usuário
- ✅ **Autenticação JWT** integrada
- ✅ **Validação de formulários** em tempo real
- ✅ **Interface responsiva** para mobile e desktop
- ✅ **Notificações** com react-hot-toast
- ✅ **Roteamento protegido** com React Router
- ✅ **Design moderno** com Tailwind CSS

## 📋 Pré-requisitos

- Node.js 16+
- NPM ou Yarn
- Backend rodando na porta 3000

## 🛠️ Instalação

1. **Navegue para a pasta frontend**
```bash
cd frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env
```

4. **Edite o arquivo `.env`** se necessário:
```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_NODE_ENV=development
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Layout.js
│   │   └── ProtectedRoute.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Dashboard.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── validation.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Componentes Principais

### **Layout**
- Header com navegação e informações do usuário
- Footer
- Layout responsivo

### **Login**
- Formulário de login com validação
- Mostrar/ocultar senha
- Integração com contexto de autenticação

### **Register**
- Formulário completo de cadastro
- Validação em tempo real
- Formatação automática de campos (telefone, CPF)

### **Dashboard**
- Exibição das informações do usuário
- Cards informativos
- Ações rápidas

## 🔧 Funcionalidades Técnicas

### **Autenticação**
- Contexto React para gerenciamento de estado
- Token JWT armazenado no localStorage
- Interceptadores Axios para autenticação automática
- Redirecionamento automático após login/logout

### **Validação**
- Validação de formulários com utilitários customizados
- Formatação automática de campos (telefone, CPF)
- Mensagens de erro em tempo real
- Validação de email, senha, CPF, etc.

### **UI/UX**
- Design system com Tailwind CSS
- Componentes reutilizáveis
- Animações e transições suaves
- Responsividade completa
- Ícones com Lucide React

### **Notificações**
- Toast notifications com react-hot-toast
- Diferentes tipos: sucesso, erro, informação
- Posicionamento e duração configuráveis

## 🎯 Páginas e Rotas

- `/login` - Página de login
- `/register` - Página de cadastro
- `/` - Dashboard (protegida)
- `*` - Redirecionamento para home

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🎨 Design System

### **Cores**
- Primary: Blue (azul principal)
- Gray: Escala de cinzas para textos e backgrounds
- Success: Green para ações positivas
- Error: Red para erros e alertas

### **Tipografia**
- Fonte: Inter (Google Fonts)
- Hierarquia clara de tamanhos e pesos

### **Componentes**
- Botões com diferentes estilos (primary, secondary, outline)
- Inputs com estados de foco e erro
- Cards com sombras e bordas arredondadas
- Formulários com validação visual

## 🔒 Segurança

- Tokens JWT seguros
- Validação de dados no frontend
- Interceptadores para autenticação automática
- Redirecionamento automático em caso de token expirado

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm start

# Build para produção
npm run build

# Testes
npm test

# Eject (não recomendado)
npm run eject
```

## 🌐 Integração com Backend

A aplicação está configurada para se comunicar com o backend através de:
- URL base configurável via variáveis de ambiente
- Proxy configurado no package.json para desenvolvimento
- Interceptadores Axios para autenticação automática

## 📝 Notas de Desenvolvimento

1. **Variáveis de Ambiente**: Configure corretamente a URL da API
2. **Backend**: Certifique-se de que o backend está rodando
3. **CORS**: O backend deve estar configurado para aceitar requisições do frontend
4. **Token**: O token JWT é armazenado no localStorage

## 🐛 Solução de Problemas

### Erro de CORS
- Verifique se o backend está configurado para aceitar requisições do frontend
- Confirme se a URL da API está correta

### Token expirado
- O sistema redireciona automaticamente para login
- Limpa automaticamente dados inválidos

### Erro de validação
- Verifique se os dados estão no formato correto
- Consulte as validações em `utils/validation.js`
