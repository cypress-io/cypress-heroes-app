/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
  namespace Cypress {
    interface Chainable {
      login: (username: string, password: string) => {};
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session(`login-${username}`, () => {
    cy.visit('/');
    cy.get('button').contains('Login').click();
    cy.get('input[type="email"]').type(username);
    cy.get('input[type="password"]').type(password);
    cy.get('button').contains('Sign in').click();
    cy.contains('button', 'Logout', { log: false }).should('be.visible');
  });
});

export {};
