# Gerenciador de Posts

Este projeto é um desafio técnico para avaliar as habilidades do desenvolvedor frontend.

O objetivo é criar uma aplicação web funcional e responsiva, utilizando boas práticas de desenvolvimento e ferramentas modernas.

A aplicação consiste em um app de gerenciamento de posts, para auxiliar o usuário a gerenciar suas publicações.

Utilizaremos a API pública JSONPlaceholder para realizar operações CRUD (Create, Read, Update, Delete) em posts.
Você deve implementar as funcionalidades de listagem, criação, edição e exclusão de posts.

## Estrutura inicial

```
src/
│
├── components/
│   ├── PostForm.jsx # Formulário para criar/editar posts (incompleto)
│   ├── PostList.jsx # Lista de posts (incompleto)
│   └── PostItem.jsx # Componente para exibir um post individual (incompleto)
│
├── services/
│   └── api.js # Configuração da API (apenas baseURL configurada)
│
├── styles/
│   └── global.css # Estilos globais
│
├── App.jsx # Componente principal (incompleto)
│
└── main.jsx # Ponto de entrada da aplicação
```

## Tarefas

- [x] **Consumir API**: Implementar a lógica para consumir a API JSONPlaceholder e disponibilizar as seguintes funcionalidades:
  - [x] Listar posts
  - [x] Criar post
  - [x] Editar post
  - [x] Excluir post
- [x] **Validações**: Adicionar validações ao formulário de criação/edição de posts
- [x] **Feedback visual**: Adicionar feedback visual ao usuário
  - [x] Loading spinner
  - [x] Mensagens de erro/sucesso
- [x] **Responsividade**: Tornar a aplicação responsiva
- [x] **Testes unitários**: Escrever testes unitários para os componentes principais

## Ideias Extras

- [x] **Gerenciamento de Requisições**: Utilizar React Query para gerenciar as requisições à API
- [x] **Paginação**: Adicionar funcionalidade de paginação
- [ ] **Pesquisa**: Adicionar funcionalidade de pesquisa por título
- [ ] **Filtros de visualização**: Implementar filtros para a visualização de posts
  - [ ] Filtrar posts por usuário
  - [ ] Filtrar posts por título/conteúdo
- [ ] **TypeScript**: Utilizar TypeScript para adicionar tipagem ao código
- [x] **Dark Mode**: Adicionar um tema escuro para a aplicação
- [x] **Animações**: Implementar animações para melhorar a experiência do usuário
- [ ] **Internacionalização**: Adicionar suporte a múltiplos idiomas na aplicação