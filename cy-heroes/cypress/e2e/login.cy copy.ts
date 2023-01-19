describe('login', () => {
  it('user should be able to log in', () => {
    cy.visit('/');
    cy.get('button').contains('Login').click();
    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('test123');
    cy.get('button').contains('Sign in').click();
    cy.contains('button', 'Logout').should('be.visible');
  });
});
