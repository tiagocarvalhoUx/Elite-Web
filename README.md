# 🚀 Elite Designer

Um portfólio moderno e futurista para uma agência de web design, com dashboard administrativo completo para gerenciamento de projetos.

![Tech Stack](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## ✨ Funcionalidades

### 🎨 Site Público
- **Design Futurista**: Interface moderna com glassmorphism, neon effects e animações suaves
- **Hero Section**: Apresentação impactante com partículas animadas
- **Portfólio Dinâmico**: Projetos carregados do banco de dados
- **Seção de Serviços**: Cards interativos com efeitos hover
- **Formulário de Contato**: Integração com WhatsApp
- **Totalmente Responsivo**: Experiência perfeita em todos os dispositivos

### 🔐 Dashboard Administrativo
- **Autenticação JWT**: Login seguro com tokens
- **Gerenciamento de Projetos**: CRUD completo com upload de imagens
- **Filtros e Busca**: Fácil localização de projetos
- **Toggle Status**: Ativar/desativar projetos rapidamente
- **Estatísticas**: Visualização de métricas importantes
- **Interface Intuitiva**: Design moderno e fácil de usar

## 🛠️ Tecnologias

### Frontend
- **Vue 3** com Composition API
- **TypeScript** para tipagem segura
- **Vue Router** para navegação
- **Pinia** para gerenciamento de estado
- **Tailwind CSS** para estilização
- **Componentes UI** personalizados com glassmorphism

### Backend
- **Node.js** com Express
- **MySQL2** para banco de dados
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **Multer** para upload de arquivos
- **CORS** habilitado

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- MySQL 8.0+
- NPM ou Yarn

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/elite-designer.git
cd elite-designer
```

### 2. Instale as dependências do frontend
```bash
npm install
```

### 3. Configure o banco de dados
```bash
# Acesse o MySQL
mysql -u root -p

# Execute o script de schema
source server/config/schema.sql
```

### 4. Configure as variáveis de ambiente
```bash
# Frontend
cp .env.example .env

# Backend
cd server
cp .env.example .env
# Edite o arquivo .env com suas credenciais do MySQL
```

### 5. Instale as dependências do backend
```bash
cd server
npm install
cd ..
```

## 🚀 Executando o Projeto

### Modo Desenvolvimento

Execute ambos os comandos em terminais separados:

```bash
# Terminal 1 - Backend
npm run server:dev

# Terminal 2 - Frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- API Docs: http://localhost:3001/api/health

### Acessar o Dashboard
1. Acesse http://localhost:5173/admin/login
2. Registre um novo usuário (primeiro acesso)
3. Faça login com as credenciais criadas

## 📁 Estrutura do Projeto

```
elite-designer/
├── src/
│   ├── components/
│   │   ├── sections/       # Componentes de seção (Hero, Projects, etc)
│   │   └── ui/             # Componentes UI reutilizáveis
│   ├── layouts/            # Layouts (Default, Admin)
│   ├── router/             # Configuração de rotas
│   ├── stores/             # Pinia stores (Auth, Projects)
│   ├── views/              # Páginas
│   │   └── admin/          # Páginas do dashboard
│   ├── style.css           # Estilos globais e variáveis CSS
│   └── main.ts             # Entry point
├── server/
│   ├── config/             # Configurações (DB, Schema)
│   ├── middleware/         # Middlewares (Auth)
│   ├── routes/             # Rotas da API
│   ├── uploads/            # Pasta de uploads
│   └── app.js              # Entry point do servidor
├── .env                    # Variáveis de ambiente frontend
└── package.json
```

## 🔌 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login (retorna JWT)

### Projetos
- `GET /api/projects` - Listar todos os projetos
- `GET /api/projects/:id` - Obter projeto específico
- `POST /api/projects` - Criar projeto (requer auth)
- `PUT /api/projects/:id` - Atualizar projeto (requer auth)
- `DELETE /api/projects/:id` - Deletar projeto (requer auth)

## 🎨 Design System

### Cores
- **Primary**: Purple (#7c3aed)
- **Secondary**: Blue (#3b82f6)
- **Accent**: Cyan (#22d3ee)
- **Background**: Dark (#0a0a0f)
- **Surface**: Glass (#12121a)

### Animações
- **fade-in**: Entrada suave
- **slide-up**: Deslizar para cima
- **scale-in**: Escala de entrada
- **glow**: Efeito de brilho
- **float**: Flutuação suave

### Componentes UI
- **GlassCard**: Cards com efeito glassmorphism
- **NeonButton**: Botões com glow neon
- **TechBadge**: Badges tecnológicos
- **FloatingParticles**: Partículas animadas de fundo

## 🔒 Segurança

- Senhas hasheadas com bcryptjs
- Autenticação JWT com expiração
- Proteção de rotas admin
- Validação de uploads de imagens
- CORS configurado

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Elite Designer** - [@elitedesigner](https://github.com/elitedesigner)

---

<p align="center">
  Feito com 💜 e muito ☕ em Araçatuba, SP
</p>
