// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/angular';
import { ButtonComponent } from '../../src/app/components/button/button.component';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

type MountParams = Parameters<typeof mount>;

Cypress.Commands.add(
  'mount',
  (component: MountParams[0], config: MountParams[1]) => {
    const declarations = [ButtonComponent];
    if (!config) {
      config = { declarations };
    } else {
      config.declarations = [...(config?.declarations || []), ...declarations];
    }
    return mount(component, config);
  }
);


// Example use:
// cy.mount(MyComponent)
