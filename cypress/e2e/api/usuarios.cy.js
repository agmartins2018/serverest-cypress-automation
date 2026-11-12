const API_URL = 'https://serverest.dev';

const gerarUsuario = (administrador = 'false') => ({
  nome: 'Usuario Teste QA',
  email: `qa_${Date.now()}_${Math.random().toString(36).substring(2, 8)}@qa.com`,
  password: '12345678',
  administrador
});

const cadastrarUsuario = (usuario) => {
  return cy.request({
    method: 'POST',
    url: `${API_URL}/usuarios`,
    body: usuario
  });
};

describe('API - ServeRest', () => {

  it('CT004 - Deve cadastrar um usuário com dados válidos', () => {
    const usuario = gerarUsuario('true');

    cadastrarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body._id).to.exist;
    });
  });

  it('CT005 - Deve realizar login na API e retornar um token', () => {
    const usuario = gerarUsuario();

    cadastrarUsuario(usuario).then((cadastroResponse) => {
      expect(cadastroResponse.status).to.eq(201);

      cy.request({
        method: 'POST',
        url: `${API_URL}/login`,
        body: {
          email: usuario.email,
          password: usuario.password
        }
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);
        expect(loginResponse.body.message).to.eq('Login realizado com sucesso');
        expect(loginResponse.body.authorization).to.be.a('string').and.not.be.empty;
      });
    });
  });

  it('CT006 - Deve consultar um usuário cadastrado pelo e-mail', () => {
    const usuario = gerarUsuario();

    cadastrarUsuario(usuario).then((cadastroResponse) => {
      expect(cadastroResponse.status).to.eq(201);

      cy.request({
        method: 'GET',
        url: `${API_URL}/usuarios`,
        qs: {
          email: usuario.email
        }
      }).then((consultaResponse) => {
        expect(consultaResponse.status).to.eq(200);
        expect(consultaResponse.body.quantidade).to.eq(1);
        expect(consultaResponse.body.usuarios[0].email).to.eq(usuario.email);
        expect(consultaResponse.body.usuarios[0].nome).to.eq(usuario.nome);
      });
    });
  });

});