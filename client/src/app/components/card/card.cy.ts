describe('CardComponent', () => {
  it('can mount', () => {
    cy.mount(`<app-avatar>Some Content</app-avatar>`);
    // cy.contains('Some Content')
  });
});
