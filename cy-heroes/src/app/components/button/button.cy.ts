import { ButtonComponent } from './button.component';

describe('button.cy.ts', () => {
  it('playground', () => {
    cy.mount(`<app-button>Click Me!</app-button>`, {
      declarations: [ButtonComponent],
      
    });

    cy.get('button').click();
  });
});
