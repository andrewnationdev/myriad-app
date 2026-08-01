# Myriad App

Myriad é uma aplicação para organizar filmes, livros e séries em uma única interface, com suporte a listas por status, busca, modo escuro, importação/exportação em CSV e tradução em múltiplos idiomas.

## Visualização

- Demo: https://myriadapp.vercel.app
- Repositório oficial: https://github.com/andrewnationdev/myriad-app

## Tecnologias empregadas

- React 18
- Vite
- TypeScript/JavaScript com JSX
- Zustand para gerenciamento de estado global
- Tailwind CSS para estilização
- Lucide React para ícones
- Vitest + Testing Library para testes

## Estrutura do app

- src/app.tsx: ponto principal da aplicação e composição das telas
- src/components/: componentes de UI, como header, cards, filtros, modal e ações de importação/exportação
- src/hooks/: lógica reutilizável de formulários e estados de interação
- src/store/: estado global da aplicação com persistência local
- src/types/: definições de tipos e schemas para mídias e traduções
- src/utils/: helpers para filtragem, CSV e dados mockados

## Decisões de design

- Interface pensada para ser simples, limpa e responsiva, com foco em produtividade visual
- O estado global foi centralizado em Zustand para facilitar a persistência e o fluxo entre componentes
- O app usa um modelo de abas e filtros para manter a navegação intuitiva mesmo com listas maiores
- A experiência de importação/exportação foi desenhada para ser direta, com feedback visual e ações de confirmação para evitar erros
- O suporte a múltiplos idiomas foi estruturado via arquivo de traduções em vez de ser hardcoded, facilitando a manutenção delas.

## Como executar localmente

```bash
npm install
npm start
```

A aplicação roda em http://localhost:3000/.

## Scripts

- npm start: inicia o ambiente de desenvolvimento
- npm test: executa os testes
- npm run build: gera a build de produção
