class LoginPage {
    selectors = {
        email: 'input[type="email"]',
        password: 'input[type="password"]',
        submit: 'button[type="submit"]'
    };

    visit() {
        cy.visit('/login');
    }

    fillEmail(email) {
        cy.get(this.selectors.email).clear().type(email);
    }

    fillPassword(password) {
        cy.get(this.selectors.password).clear().type(password);
    }

    clickLogin() {
        cy.get(this.selectors.submit).click();
    }

    login(email, password) {
        this.fillEmail(email);
        this.fillPassword(password);
        this.clickLogin();
    }
}

export default LoginPage;