import { Component } from '@angular/core';
import * as cypress from 'cypress';
import { createOutputSpy } from 'cypress/angular';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  it('should mount', () => {
    cy.mount(ButtonComponent);
  });

  it('should have custom text', () => {
    cy.mount(`<app-button>Click me</app-button>`);
    cy.get('button').should('have.text', 'Click me');
  });

  it('should have custom text', () => {
    cy.mount(`<app-button>Click me</app-button>`);
    cy.get('button').should('have.text', 'Click me');
  });

  it('should not be focused when focus is falsey', () => {
    cy.mount(`<app-button>Click me</app-button>`);
    cy.focused().should('not.exist');
  });

  it('should be focused when focus is true', () => {
    cy.mount(`<app-button focus="true">Click me</app-button>`);
    cy.focused().should('have.text', 'Click me');
  });

  it('should respond to onClick event', () => {
    cy.mount('<app-button (click)="onClick.emit($event)">Click me</app-button>', {
      componentProperties: {
        onClick: createOutputSpy('onClickSpy')
      },
    });
    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.called');
  });
});
