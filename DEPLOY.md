# 🚀 Guia de Deploy no Render

Este guia irá te ajudar a fazer o deploy completo do backend e frontend no Render.

## 📋 Pré-requisitos

1. Conta no [Render](https://render.com) (Plano gratuito disponível)
2. Conta no [Supabase](https://supabase.com)
3. Repositório Git (GitHub, GitLab ou Bitbucket)

## 🎯 Opção 1: Deploy Automático com render.yaml (Recomendado)

O arquivo `render.yaml` na raiz do projeto permite deploy de ambos os serviços de uma vez.

1. Faça push do código para o GitHub/GitLab/Bitbucket
2. No Render Dashboard, clique em **New +** → **Blueprint**
3. Conecte seu repositório Git
4. Render irá detectar o `render.yaml` e configurar automaticamente
5. Defina as variáveis de ambiente conforme abaixo
6. Clique em **Apply** para iniciar o deploy

## 🔧 Opção 2: Deploy Manual (Mais controle)

## 🔧 Configuração no Supabase

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em **Settings** → **API**
3. Copie as seguintes informações:
   - `Project URL` (SUPABASE_URL)
   - `anon public` key (SUPABASE_ANON_KEY)
   - `service_role secret` key (SUPABASE_SERVICE_ROLE_KEY)

## 🔐 Configuração no Render

### Backend

1. Acesse o [Render Dashboard](https://dashboard.render.com)
2. Clique em **New +** → **Web Service**
3. Conecte seu repositório Git
4. Configure o serviço:
   - **Name**: `backend-api`
   - **Region**: `Oregon` (ou sua preferência)
   - **Branch**: `master`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm ci --production=false`
   - **Start Command**: `npm start`

5. **Variáveis de Ambiente** (Environment Variables):
   ```
   NODE_ENV=production
   FRONTEND_URL=https://seu-frontend.onrender.com
   SUPABASE_URL=sua_url_do_supabase
   SUPABASE_ANON_KEY=sua_anon_key
   SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
   JWT_SECRET=seu_jwt_secret_super_seguro
   JWT_EXPIRES_IN=7d
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

6. Clique em **Create Web Service**

### Frontend

1. No Render Dashboard, clique em **New +** → **Static Site**
2. Conecte seu repositório Git
3. Configure o serviço:
   - **Name**: `frontend-react`
   - **Branch**: `master`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `build`

4. **Variáveis de Ambiente** (IMPORTANTE: Configure ANTES do primeiro build):
   ```
   REACT_APP_API_URL=https://backend-api.onrender.com/api
   REACT_APP_NODE_ENV=production
   ```
   
   ⚠️ **CRÍTICO**: A variável `REACT_APP_API_URL` DEVE ser configurada ANTES do primeiro build, pois ela é incorporada no código durante o build. Se você esquecer, precisará fazer um novo build após configurar.

5. Clique em **Create Static Site**

## ⚠️ Importante

### Atualização da variável FRONTEND_URL no Backend

Após criar o frontend, você receberá um URL como `https://hoteltransilvania-1.onrender.com`.

1. Volte nas configurações do backend
2. Atualize a variável `FRONTEND_URL` para o URL do frontend (sem trailing slash):
   ```
   FRONTEND_URL=https://hoteltransilvania-1.onrender.com
   ```
3. **Reinicie o serviço do backend** após atualizar a variável

### CORS

O backend está configurado para aceitar requisições do frontend. Certifique-se de que:
- O `FRONTEND_URL` no backend corresponde exatamente ao URL do frontend
- Não há trailing slash nas URLs

## 🔄 Deploy Automático

Após a configuração inicial, o Render fará deploy automaticamente sempre que você fizer push para o branch `master`.

## 🧪 Testando o Deploy

1. **Backend**: Acesse `https://backend-api.onrender.com/health`
   - Deve retornar: `{"success":true, "message":"API funcionando corretamente"}`

2. **Frontend**: Acesse `https://frontend-react.onrender.com`
   - Deve carregar a aplicação React

## 🐛 Resolução de Problemas

### Backend não inicia
- Verifique se todas as variáveis de ambiente estão configuradas
- Confira os logs no Render Dashboard
- Certifique-se que `npm start` está funcionando localmente

### Frontend não se conecta ao backend (Erro 404 "Rota não encontrada")
- **Verifique se `REACT_APP_API_URL` está configurado corretamente no Render**
  - A URL deve ser: `https://backend-api.onrender.com/api` (substitua `backend-api` pelo nome do seu serviço)
  - ⚠️ Se você configurou a variável DEPOIS do build, faça um novo build
- **Certifique-se que o `FRONTEND_URL` no backend está correto**
  - Deve ser exatamente: `https://hoteltransilvania-1.onrender.com` (sem trailing slash)
  - Reinicie o backend após atualizar
- **Verifique os logs do backend** para erros de CORS
- **Abra o console do navegador** (F12) e verifique se há erros de CORS ou 404
- **Teste a API diretamente**: Acesse `https://backend-api.onrender.com/health` no navegador

### Erro 500 no backend
- Verifique as credenciais do Supabase
- Confira se as tabelas foram criadas corretamente no Supabase
- Veja os logs detalhados no Render Dashboard

## 📝 Notas

- O plano gratuito do Render pode "hibernar" serviços após 15 minutos de inatividade
- A primeira requisição após hibernação pode demorar mais
- Para produção, considere upgrade para o plano pago
- Use um gerador seguro de JWT_SECRET (ex: OpenSSL ou geradores online)

## 🔗 Links Úteis

- [Documentação Render](https://render.com/docs)
- [Documentação Supabase](https://supabase.com/docs)
- [Configuração CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

