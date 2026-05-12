# Portfólio

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/a7efbffb12c04c90a7599320d06e9090)](https://app.codacy.com/gh/iShouldz/portifolio/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

Portfólio pessoal desenvolvido para apresentar projetos, experiências e formas de contato em uma experiência visual mais interativa, com navegação fluida, suporte a múltiplos idiomas e páginas de detalhe para cada projeto.

## Visão geral

Este projeto funciona como uma vitrine profissional no navegador.  
Além da parte institucional (home, resumo, experiências e contato), ele também traz páginas de projeto com documentação renderizada diretamente do GitHub, galeria de mídia e links externos (deploy, Figma e repositório).

## Tecnologias principais

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS + shadcn/ui
- Framer Motion (motion)
- i18next (pt, en, es)
- Vitest + Testing Library

## Funcionalidades do portfólio

- Página inicial com hero animado e seção de recomendações
- Navegação por dock flutuante com atalhos rápidos
- Alternância de idioma com persistência local
- Tema claro/escuro
- Download de currículo direto pela interface
- Timeline de experiências profissionais
- Página de resumo com cards interativos
- Listagem de projetos e navegação para detalhes
- Página de detalhes com:
  - galeria de imagens/vídeos
  - leitura de README remoto
  - tecnologias, tags e links relevantes
  - blocos de recursos separados por feature e product
- Página de contato com formulário via EmailJS
- Botões para LinkedIn, GitHub e cópia rápida de e-mail

### Pré-requisitos

- Node.js 20+
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

## Deploy

O projeto está preparado para deploy estático (SPA), com `vercel.json` configurado para redirecionar todas as rotas para `index.html`.
