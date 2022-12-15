describe('login', () => {
  it('user should be able to log in', () => {
    cy.visit('/').wait(500, { log: false });
    cy.get('button').wait(1000, { log: false }).contains('Login').click();
    cy.get('input[type="email"]')
      .wait(1000, { log: false })
      .type('test@test.com');
    cy.get('input[type="password"]').wait(1000, { log: false }).type('test123');
    cy.get('button').contains('Sign in').wait(1000, { log: false }).click();
    cy.contains('button', 'Logout', { log: false })
      .wait(1000, { log: false })
      .should('be.visible');
  });
});
