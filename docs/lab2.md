# Lab2 - Cypress Component Testing

## Getting Started

To get started, make sure your current branch is clean, and then checkout the `lab2-start` branch:

```
git checkout lab2-start
```

You can find a completed version of this lab in the [lab2-complete](https://github.com/cypress-io/cypress-heroes-app/tree/lab2-complete) branch.

If the app is not currently running, start it:

```bash title='./client'
npm run start
```

## Setup Cypress

Add Cypress Schematic:

```ts title=./client
ng add @cypress/schematic
```

When asked to set up e2e, select no

When asked to add CT, select yes

When asked to add CT alongside existing components, select no (we'll do these
one at a time)

## Launch Cypress

open Cypress

```ts title=./client
npm cypress:open
```

select CT

start browser

no tests found, lets scaffold one

## Button Component Test

add spec:

```ts title=./client/src/app/components/button/button.component.cy.ts
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  it('should mount', () => {
    cy.mount(ButtonComponent);
  });
});
```

the component mounts but looks off because we aren't passing in a slot

add test to use wrapper:

```ts title=./client/src/app/components/button/button.component.cy.ts
it('should have custom text', () => {
  @Component({
    template: '<app-button>Click me</app-button>',
  })
  class Wrapper {}

  cy.mount(Wrapper, {
    declarations: [ButtonComponent],
  });
  cy.get('button').should('have.text', 'Click me');
});
```

update to use template syntax

```ts title=./client/src/app/components/button/button.component.cy.ts
it('should have custom text', () => {
  cy.mount(`<app-button>Click me</app-button>`, {
    declarations: [ButtonComponent],
  });
  cy.get('button').should('have.text', 'Click me');
});
```

## Custom mount command

Add custom mount command to always include button declaration:

```ts title=./client/cypress/support/component.ts
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
```

now our tests don't need to include button:

```ts title=./client/src/app/components/button/button.component.cy.ts
it('should have custom text', () => {
  cy.mount(`<app-button>Click me</app-button>`);
  cy.get('button').should('have.text', 'Click me');
});
```

we can make mount command better by importing the components module

```ts title=./client/cypress/support/component.ts
Cypress.Commands.add(
  'mount',
  (component: MountParams[0], config: MountParams[1]) => {
    const imports = [ComponentsModule];
    if (!config) {
      config = { imports };
    } else {
      config.imports = [...(config?.imports || []), ...imports];
    }
    return mount(component, config);
  }
);
```

## Testing Button with an @Input

test if focus input works

```ts title=./client/src/app/components/button/button.component.cy.ts
it('should not be focused when focus is falsey', () => {
  cy.mount(`<app-button>Click me</app-button>`);
  cy.focused().should('not.exist');
});

it('should be focused when focus is true', () => {
  cy.mount(`<app-button focus="true">Click me</app-button>`);
  cy.focused().should('have.text', 'Click me');
});
```

## Testing an emitted event

```ts title=./client/src/app/components/button/button.component.cy.ts
it('should respond to onClick event', () => {
  cy.mount('<app-button (click)="onClick.emit($event)">Click me</app-button>', {
    componentProperties: {
      onClick: {
        emit: cy.spy().as('onClickSpy'),
      },
    },
  });
  cy.get('button').click();
  cy.get('@onClickSpy').should('have.been.called');
});
```

defining the click spy is a bit verbose, so use `createOutputSpy`:

```ts title=./client/src/app/components/button/button.component.cy.ts
it('should respond to onClick event', () => {
  cy.mount('<app-button (click)="onClick.emit($event)">Click me</app-button>', {
    componentProperties: {
      onClick: createOutputSpy('onClickSpy'),
    },
  });
  cy.get('button').click();
  cy.get('@onClickSpy').should('have.been.called');
});
```

> We also have a method to auto create spies for all outputs, with a caveat
> that you need to use the component syntax. See
> [Using autoSpyOutputs](https://docs.cypress.io/guides/component-testing/events-angular#Using-autoSpyOutputs)
> in the docs for more info.
