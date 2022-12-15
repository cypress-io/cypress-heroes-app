describe('hero edit page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('user should be able add hero', function () {
    cy.login('test@test.com', 'test123');
    cy.visit('/');
    cy.contains('button', 'Logout').should('be.visible');
  });

  it('enter invalid data should result in validation error', () => {
    //get first hero and click like
    cy.get('app-card')
      .first()
      .as('firstHero')
      .find('app-icon-button[icon=like]')
      .click();
    cy.contains('You must log in to like.');
    cy.get('button').contains('Ok').click();
    cy.contains('You must log in to like.').should('not.exist');
  });

  it('should be able to attach an avatar image', () => {
    //get first hero and click like
    cy.get('app-card')
      .first()
      .as('firstHero')
      .find('app-icon-button[icon=money]')
      .click();
    cy.contains('You must log in to hire this hero.');
    cy.get('button').contains('Ok').click();
    cy.contains('You must log in to hire this hero.').should('not.exist');
  });
});
