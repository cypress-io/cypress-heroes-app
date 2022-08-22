describe('Angular App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('checks title', () => {
    cy.title().should('equal', 'CyHeroes');
  });

  it('can login', () => {
    cy.get('#login').should('have.text', 'Login');
    cy.get('#login').click();

    cy.get('#login-email').type('test@test.com');
    cy.get('#login-password').type('test123');

    cy.get('#signin').click();

    cy.get('#logout').should('have.text', 'Logout');
  });

  it('displays heroes', () => {
    cy.get('app-hero-list li').its('length').should('not.equal', 0);
  });
});
