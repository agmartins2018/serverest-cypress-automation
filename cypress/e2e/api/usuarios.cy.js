const API_URL = 'https://serverest.dev';

describe('API - ServeRest', () => {

  it('CT004 - Deve cadastrar um usuário com dados válidos', () => {
    const email = `teste${Date.now()}@qa.com`;

    const usuario = {
      nome: 'Usuario Teste QA',
      email: email,
      password: '12345678',
      administrador: 'true'
    };

    cy.request({
      method: 'POST',
      url: `${API_URL}/usuarios`,
      body: usuario
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body._id).to.exist;
    });
  });

  it('CT005 - Deve realizar login na API e retornar um token', () => {
    const email = Cypress.env('userEmail');
    const password = Cypress.env('userPassword');

    expect(email, 'E-mail configurado').to.be.a('string').and.not.be.empty;
    expect(password, 'Senha configurada').to.be.a('string').and.not.be.empty;

    cy.request({
      method: 'POST',
      url: `${API_URL}/login`,
      body: {
        email: email,
        password: password
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Login realizado com sucesso');
      expect(response.body.authorization).to.be.a('string').and.not.be.empty;
    });
  });

  it('CT006 - Deve consultar um usuário cadastrado pelo e-mail', () => {
    const email = `consulta${Date.now()}@qa.com`;

    const usuario = {
      nome: 'Usuario Consulta QA',
      email: email,
      password: '12345678',
      administrador: 'false'
    };

    // Primeiro cadastra o usuário
    cy.request({
      method: 'POST',
      url: `${API_URL}/usuarios`,
      body: usuario
    }).then((cadastroResponse) => {
      expect(cadastroResponse.status).to.eq(201);

      // Depois consulta o usuário pelo e-mail
      cy.request({
        method: 'GET',
        url: `${API_URL}/usuarios`,
        qs: {
          email: email
        }
      }).then((consultaResponse) => {
        expect(consultaResponse.status).to.eq(200);
        expect(consultaResponse.body.quantidade).to.eq(1);
        expect(consultaResponse.body.usuarios[0].email).to.eq(email);
        expect(consultaResponse.body.usuarios[0].nome).to.eq(usuario.nome);
      });
    });
  });

});