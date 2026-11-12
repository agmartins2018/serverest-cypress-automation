import LoginPage from '../../support/pages/LoginPage';

describe('Funcionalidade de Login - ServeRest', () => {

  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('CT001 - Deve realizar login com credenciais válidas', () => {
    const email = Cypress.env('userEmail');
    const password = Cypress.env('userPassword');

    expect(email, 'E-mail configurado').to.be.a('string').and.not.be.empty;
    expect(password, 'Senha configurada').to.be.a('string').and.not.be.empty;

    loginPage.login(email, password);

    cy.location('pathname').should('not.eq', '/login');
  });

  it('CT002 - Não deve realizar login com senha inválida', () => {
    const email = Cypress.env('userEmail');

    loginPage.login(email, 'senha_incorreta');

    cy.location('pathname').should('eq', '/login');
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