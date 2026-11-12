# serverest-cypress-automation

# ServeRest — Cypress Automation

Projeto de automação de testes desenvolvido com **Cypress e JavaScript**, contemplando testes End-to-End (Frontend) e testes de API da aplicação ServeRest.

## Tecnologias

- JavaScript
- Node.js
- npm
- Cypress 14.5.4
- Git e GitHub

## Aplicações testadas

- **Frontend:** https://front.serverest.dev/login
- **API:** https://serverest.dev/

## Estrutura do projeto

```text
serverest-cypress-automation/
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
├── cypress.env.json
├── package.json
├── package-lock.json
└── README.md
```

> O arquivo `cypress.env.json` é local e não deve ser versionado.

## Cenários automatizados

### Frontend — Login

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT001 | Login com credenciais válidas | Autenticação realizada |
| CT002 | Login com senha inválida | Autenticação recusada |
| CT003 | Login com campos vazios | Mensagens de validação exibidas |

### API — ServeRest

| ID | Cenário | Método | Endpoint |
|---|---|---|---|
| CT004 | Cadastro de usuário com dados válidos | POST | `/usuarios` |
| CT005 | Login na API e retorno do token | POST | `/login` |
| CT006 | Consulta de usuário pelo e-mail | GET | `/usuarios` |

## Pré-requisitos

- Node.js e npm instalados.
- Git instalado.

## Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Acesse a pasta:

```bash
cd serverest-cypress-automation
```

Instale as dependências:

```bash
npm install
```

## Configuração das credenciais

Crie o arquivo `cypress.env.json` na raiz do projeto:

```json
{
  "userEmail": "SEU_EMAIL",
  "userPassword": "SUA_SENHA"
}
```

Utilize credenciais válidas para a aplicação.

**Importante:** esse arquivo está listado no `.gitignore` e não deve ser enviado ao GitHub.

## Execução dos testes

Abrir a interface do Cypress:

```bash
npm run cy:open
```

Executar todos os testes:

```bash
npm run cy:run
```

Executar somente Frontend:

```bash
npm run test:frontend
```

Executar somente API:

```bash
npm run test:api
```

## Resultado da execução

Última execução local:

| Suíte | Total | Aprovados | Falhas |
|---|---:|---:|---:|
| Frontend | 3 | 3 | 0 |
| API | 3 | 3 | 0 |
| **Total** | **6** | **6** | **0** |

Resultado geral:

```text
6 passing
0 failing
```

## Boas práticas aplicadas

- Separação entre testes de API e Frontend.
- Page Object Model (POM) para organização das interações com a interface.
- Assertions para validação dos resultados.
- Geração dinâmica de e-mails nos cadastros.
- Configuração de credenciais fora dos arquivos de teste.
- Organização dos cenários por funcionalidade.

## Autor

Projeto desenvolvido como parte de uma avaliação técnica de QA Automation.
