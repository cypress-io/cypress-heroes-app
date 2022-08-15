import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  it('can mount', () => {
    cy.mount(ButtonComponent);
    cy.get('button');
  });

  it('mounts with template', () => {
    cy.mount(`<app-button>Click Me</app-button>`);
    cy.get('button').contains('Click Me');
  });

  it.only('onClick works', () => {
    cy.mount(`<app-button (onClick)="onClick()">Click Me</app-button>`, {
      componentProperties: {
        onClick: cy.spy().as('onClickSpy'),
      },
    });
    cy.get('button').contains('Click Me').as('button');
    cy.get('@button').click();
    cy.get('@onClickSpy').should('have.been.called');
  });
});
