# ServeRest — Cypress Automation

Projeto de automação de testes desenvolvido com **Cypress e JavaScript**, contemplando testes End-to-End (Frontend) e testes de API da aplicação ServeRest.

O projeto foi desenvolvido como parte de uma avaliação técnica de QA Automation, aplicando boas práticas de organização, reutilização de código, geração dinâmica de dados e Integração Contínua (CI).

## Tecnologias utilizadas

- JavaScript
- Node.js
- npm
- Cypress 14.5.4
- Git e GitHub
- GitHub Actions

## Aplicações testadas

| Aplicação | Endereço |
|---|---|
| Frontend | https://front.serverest.dev/login |
| API | https://serverest.dev/ |

## Estrutura do projeto

```text
serverest-cypress-automation/
├── .github/
│   └── workflows/
│       └── cypress.yml
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   └── usuarios.cy.js
│   │   └── frontend/
│   │       └── login.cy.js
│   ├── fixtures/
│   └── support/
│       ├── pages/
│       │   └── LoginPage.js
│       ├── commands.js
│       └── e2e.js
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

**Observação:** arquivos locais, como `cypress.env.json`, `node_modules` e evidências de execução, não são versionados no repositório.

## Cenários automatizados

### Frontend — Login

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT001 | Login com credenciais válidas | Autenticação realizada com sucesso |
| CT002 | Login com senha inválida | Autenticação recusada |
| CT003 | Login com campos vazios | Mensagens de validação exibidas |

### API — ServeRest

| ID | Cenário | Método | Endpoint | Resultado esperado |
|---|---|---|---|---|
| CT004 | Cadastro de usuário com dados válidos | POST | `/usuarios` | Cadastro realizado com sucesso |
| CT005 | Login na API e retorno do token | POST | `/login` | Token de autorização retornado |
| CT006 | Consulta de usuário pelo e-mail | GET | `/usuarios` | Usuário localizado corretamente |

## Estratégia de testes

Os testes utilizam dados dinâmicos para evitar dependência de usuários previamente cadastrados.

- Os cenários de login do Frontend criam usuários pela API antes de realizar a autenticação.
- O teste de login da API também cadastra um usuário antes de validar a autenticação.
- Os cadast
