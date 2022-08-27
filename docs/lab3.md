# Lab3 - Diving Deeper into Component Testing

In the previous lab, you got a taste of the basics of component testing with
Cypress. In this lab, we will go a bit deeper and see how to test a more
complex component.

The `LoginForm` component will be a good example. It is a component that is
comprised of other components to make up its functionality. There are form
inputs to manipulate (with validation) and an HTTP request to consider. We'll
also look at additional Angular APIs around component registration and
dependency injection for more complex components like the `LoginForm`.

Let's get started!

## Getting Started

If you continue from lab 2, you can stay in your current branch.

If you are starting with lab 3, checkout the `lab3-start` branch:

```
git checkout lab3-start
```

:::info

You can find a completed version of this lab in the
[lab3-complete](https://github.com/cypress-io/cypress-heroes-app/tree/lab3-complete)
branch.

:::

If the app is not currently running, start it:

```bash title=./client
npm run start
```

Also, if Cypress is not already running, start it up and launch component
testing:

```bash title=./client
npx cypress open
```

## Create LoginForm Spec

Create a new spec file at
**./client/src/app/components/login-form.component.cy.ts** and paste in the
following test:

```ts title=./client/src/app/components/login-form.component.cy.ts
describe('LoginForm', () => {
  it('should mount', () => {
    cy.mount('<app-login-form></app-login-form>');
  });
});
```

When the spec is run, you'll see an error thrown in the command log:

![Login Form Error](/img/login-form-error.jpg)

The error happens because the HttpClientModule is not currently registered. You might
wonder why. The app component has the module registered. But we
are not using the main app component in our test. We are mounting the
`LoginFormComponent` in isolation.

#### Register Additional Modules and Declarations

We've already seen how to register components as declarations by passing in a
`declarations` array into the `cy.mount` command's second parameter. This config
parameter allows us to register additional `imports` and `providers`.

We can get the test passing by registering the additional modules and
declarations `LoginFormComponent` needs like so:

```ts title=./client/src/app/components/login-form.component.cy.ts
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { InputFieldComponent } from '../input-field/input-field.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { LoginFormComponent } from './login-form.component';

describe('LoginForm', () => {
  it('should mount', () => {
    cy.mount('<app-login-form></app-login-form>', {
      declarations: [
        LoginFormComponent,
        InputFieldComponent,
        ButtonComponent,
        TextInputComponent,
      ],
      imports: [HttpClientModule, ReactiveFormsModule],
    });
  });
});
```

Now the component properly mounts:

![Login Form Passes](/img/login-form-passes.jpg)

However, that is a lot of boilerplate code for each test. Fortunately,
we can use a custom `cy.mount` command to do this registration in a reusable,
central location and clean up our specs.

## Using a Custom Mount Command

With a custom mount command, we can do the configuration that our tests need to
execute before calling the underlying `mount` command.

To create one, go into the **./client/cypress/support/component.ts** file and
replace the current call to register the mount command (around line 36):

```ts title=./client/cypress/support/component.ts
Cypress.Commands.add('mount', mount);
```

with:

```ts title=./client/cypress/support/component.ts
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../src/app/components/button/button.component';
import { InputFieldComponent } from '../../src/app/components/input-field/input-field.component';
import { TextInputComponent } from '../../src/app/components/text-input/text-input.component';
import { LoginFormComponent } from '../../src/app/components/login-form/login-form.component';

type MountParams = Parameters<typeof mount>;

Cypress.Commands.add(
  'mount',
  (component: MountParams[0], config: MountParams[1] = {}) => {
    const declarations = [
      ...(config.declarations || []),
      LoginFormComponent,
      InputFieldComponent,
      ButtonComponent,
      TextInputComponent,
    ];
    const imports = [
      ...(config.imports || []),
      HttpClientModule,
      ReactiveFormsModule,
    ];
    return mount(component, {
      ...config,
      declarations,
      imports,
    });
  }
);
```

The new mount command has some predefined `declarations` and `imports` that get
passed into the underlying mount function, so we don't have to specify them in
each test.

Now you can shorten the test to:

```ts title=./client/src/app/components/login-form.component.cy.ts
it('should mount', () => {
  cy.mount('<app-login-form></app-login-form>');
});
```

Nice 🎉!

But we can even take our mount command a step further. In the Heroes app, all components belong to their own `ComponentsModule`. So instead of importing each piece individually, we
can use the `ComponentModule` in the custom mount command:

```ts title=./client/cypress/support/component.ts
import { ComponentsModule } from '../../src/app/components/components.module';

type MountParams = Parameters<typeof mount>;

Cypress.Commands.add(
  'mount',
  (component: MountParams[0], config: MountParams[1] = {}) => {
    const imports = [...(config.imports || []), ComponentsModule];
    return mount(component, {
      ...config,
      imports,
    });
  }
);
```

You can use custom mount commands to suit your needs. You can even create
multiple ones with different names (ie: `cy.mountInputs`).

For more information on creating your own custom mount commands, see the guide
on
[Custom Mount Commands for Angular](https://docs.cypress.io/guides/component-testing/custom-mount-angular).

## Test Form Validation

Ok, back to writing actual tests. We will first look at
testing to verify the form validation works as expected. There are three
requirements here.

1. If either of the fields is blank when submitting the form, show messages
   saying the fields are required.
2. The email address must be in the proper format; if not, show a message.
3. The form should not submit to the server when in an invalid state.

#### Test Required Field Validation

For the first test, we will grab a reference to the button and click it without
filling in the email or password. Then we will check that the validation error messages are displayed:

```ts title=./client/src/app/components/login-form.component.ts
it('should show validation messages when inputs are blank', () => {
  cy.mount('<app-login-form></app-login-form>');
  cy.get('button').contains('Sign in').click();

  cy.contains('Email is required.');
  cy.contains('Password is required.');
});
```

#### Test Email Field Validation

For the next test, we will fill in an invalid value for the email address and verify
the message displays after clicking the button:

```ts title=./client/src/app/components/login-form.component.ts
it('should show validation messages when email value is invalid', () => {
  cy.mount('<app-login-form></app-login-form>');
  cy.get('input[type=email]').type('aaabbb');
  cy.get('button').contains('Sign in').click();
  cy.contains('Email must be a valid email address.');
});
```

Above, we use the [type()](https://docs.cypress.io/api/commands/type) command on
the email input, which enters text into a DOM element like a user would.

#### Test Form is Not Submitted when Invalid

Up to this point, we've been testing as a user would use the component, which is
great. This next test will require us to have inside knowledge of what's going on inside of the component. Mentally, we are
going to shift who we are testing for. In the previous tests, we made sure
the component was valid for users. In this upcoming test, we will ensure the
component works as it should for other developers who will consume it.

To do so, we will need to know what happens when the users submit the form.
Peaking at the source, we see that `authService.login()` is being called. We want to ensure this method does not get called when the form is
invalid.

We can add a spy to the `authService.login()` method and inspect if it was
called or not as we did with the `onClick` method of the `ButtonComponent`
from the last lesson.

Fortunately, Angular's dependency injection system makes this relatively easy to
do. We must pass in a mock AuthService with a spy attached to the
`login` method. We'll do so by passing in the mock to the `providers`:

```ts title=./client/src/app/components/login-form.component.ts
it('should not try to authenticate if the form fields are invalid', () => {
  cy.mount('<app-login-form></app-login-form>', {
    providers: [
      {
        provide: AuthService,
        useValue: {
          login: cy.spy().as('loginSpy'),
        },
      },
    ],
  });

  cy.get('button').contains('Sign in').click();
  cy.get('@loginSpy').should('not.have.been.called');
});
```

And with that, you should see that all the validation tests now pass:

![Login Form Validation Passes](/img/login-form-validation.jpg)

## Test Invalid Credentials

What should the form do when a syntactically valid email and password is entered, but those credentials don't match anything in the system? We display an invalid username or password error.

The authentication result comes from the `authService.login` method we mocked in the last test. We could do something similar to test this, but I want to show you another method at your disposal.

The `authService.login` method ultimately makes an HTTP request to check the credentials. We can use the [cy.intercept](https://docs.cypress.io/api/commands/intercept) command to "intercept" the request and return the values we need for the test. When we do so, the HTTP request is never sent to the server, and we effectively turned out component test into an integration test between the component and the `AuthService`.

To use `cy.intercept`, call the command before the actual HTTP is made and pass in the method type, the path, and the response to return:

```ts title=./client/src/app/components/login-form.component.ts
it('should show bad login message when credentials are invalid', () => {
  cy.intercept('POST', '/auth', {
    statusCode: 401,
  });

  cy.mount('<app-login-form></app-login-form>');
  cy.get('button').contains('Sign in').click();

  cy.get('input[type=email]').type('bad@email.com');
  cy.get('input[type=password]').type('badpass');
  cy.get('button').contains('Sign in').click();

  cy.contains('Invalid username or password');
});
```

We return a 401 status code, which signifies to the client that the authentication request was unsuccessful. The auth service returns an error message saying the username or password was invalid.

## Test Valid credentials

When testing what happens when the credentials are valid, we will take a similar approach to the above. Instead of returning a 401 status code, we will return a 200, signifying the request was successful.

The `LoginFormComponent` also has an `onLogin` event output that gets raised when the login is successful. Let's verify that also gets called using the spy techniques we've already used:

```ts title=./client/src/app/components/login-form.component.ts
it('should login when credentials are valid', () => {
  cy.intercept('POST', '/auth', {
    statusCode: 200,
    body: {},
  });

  cy.mount(
    '<app-login-form (onLogin)="onLogin.emit($event)"></app-login-form>',
    {
      componentProperties: {
        onLogin: createOutputSpy('onLoginSpy'),
      },
    }
  );

  cy.get('input[type=email]').type('good@email.com');
  cy.get('input[type=password]').type('goodpass');

  cy.get('button').contains('Sign in').click();

  cy.get('@onLoginSpy').should('have.been.called');
});
```

> `createOutputSpy is imported from 'cypress/angular'

## Additional Resources

Congrats! You now have the basics for writing Angular Component Tests. Continue your testing journey by visiting the [Cypress Documentation](https://docs.cypress.com), learn testing concepts in depth in our [Real World Testing](https://learn.cypress.io/) curriculum, and join our online community on [Discord](https://discord.gg/cMjUZg7).

Thanks for attending, and happy testing!