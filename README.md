# Elite Web Designer

Uma landing page moderna e responsiva para uma agência de desenvolvimento web, construída com Vue 3, Vite e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript progressivo
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework CSS utilitário
- **Mobile First** - Design responsivo priorizando dispositivos móveis

## 📁 Estrutura do Projeto

```
elite-web-designer/
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── CreativeBanner.vue
│   │   │   ├── HeroSection.vue
│   │   │   ├── ServicesSection.vue
│   │   │   ├── ProjectsSection.vue
│   │   │   ├── StatsSection.vue
│   │   │   ├── ContactSection.vue
│   │   │   └── FooterSection.vue
│   │   ├── NavBar.vue
│   │   └── FloatingWhatsApp.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎨 Recursos

- ✅ **Design Mobile First** - Totalmente responsivo
- ✅ **Animações Suaves** - CSS animations e transitions
- ✅ **Banner Promocional** - Banner criativo no topo
- ✅ **Navegação Smooth** - Scroll suave entre seções
- ✅ **Formulário de Contato** - Integrado com WhatsApp
- ✅ **Botão WhatsApp Flutuante** - Acesso rápido ao contato
- ✅ **Gradientes Animados** - Visual moderno e atrativo
- ✅ **Cards Interativos** - Efeitos hover nos projetos
- ✅ **SEO Otimizado** - Meta tags e estrutura semântica

## 🛠️ Instalação e Uso

1. **Clone o repositório:**
```bash
git clone https://github.com/seuusuario/elite-web-designer.git
cd elite-web-designer
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Build para produção:**
```bash
npm run build
```

## 📱 Responsividade

O projeto utiliza breakpoints do Tailwind CSS:

- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: > 768px
- **XS**: 475px (breakpoint customizado)

## 🎨 Customização

### Cores e Gradientes
As cores principais podem ser modificadas no arquivo `src/style.css`:

```css
.gradient-bg {
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
}
```

### Animações
As animações customizadas estão configuradas no `tailwind.config.js`:

```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
  'gradient': 'gradient 8s linear infinite',
  'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}
```

## 📞 Contato WhatsApp

Para personalizar o número do WhatsApp, altere nos arquivos:
- `src/components/FloatingWhatsApp.vue`
- `src/components/sections/ContactSection.vue`

Substitua `5511999999999` pelo seu número no formato internacional.

## 🚀 Deploy

O projeto pode ser facilmente deployado em:

- **Vercel**: `vercel --prod`
- **Netlify**: Conecte o repositório
- **GitHub Pages**: Configure GitHub Actions
- **Firebase Hosting**: `firebase deploy`

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ por Elite Web Designer