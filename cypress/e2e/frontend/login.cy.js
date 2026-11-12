import LoginPage from '../../support/pages/LoginPage';

const API_URL = 'https://serverest.dev';

function gerarUsuario() {
  const identificador = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    nome: 'Usuario Teste QA',
    email: `teste${identificador}@qa.com`,
    password: '12345678',
    administrador: 'false'
  };
}

function cadastrarUsuario(usuario) {
  return cy.request({
    method: 'POST',
    url: `${API_URL}/usuarios`,
    body: usuario
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body.message).to.eq('Cadastro realizado com sucesso');

    return usuario;
  });
}

describe('Funcionalidade de Login - ServeRest', () => {

  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('CT001 - Deve realizar login com credenciais válidas', () => {
    const usuario = gerarUsuario();

    cadastrarUsuario(usuario).then((usuarioCadastrado) => {
      loginPage.login(usuarioCadastrado.email, usuarioCadastrado.password);

      cy.location('pathname').should('not.eq', '/login');
    });
  });

  it('CT002 - Não deve realizar login com senha inválida', () => {
    const usuario = gerarUsuario();

    cadastrarUsuario(usuario).then((usuarioCadastrado) => {
      loginPage.login(usuarioCadastrado.email, 'senha_incorreta');

      cy.location('pathname').should('eq', '/login');
    });
  });

  it('CT003 - Não deve realizar login com campos vazios', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Email é obrigatório')
      .should('be.visible');

    cy.contains('Password é obrigatório')
      .should('be.visible');

    cy.location('pathname')
      .should('eq', '/login');
  });

});