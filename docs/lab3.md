# Lab3 - Testing a Form

## Getting Started

To get started, make sure your current branch is clean, and then checkout the
`lab3-start` branch:

```
git checkout lab3-start
```

You can find a completed version of this lab in the
[lab3-complete](https://github.com/cypress-io/cypress-heroes-app/tree/lab3-complete)
branch.

If the app is not currently running, start it:

```bash title='./client'
npm run start
```

## Create LoginForm Spec

```ts title=./client/src/app/components/login-form.component.ts
describe('LoginModal', () => {
  it('should mount', () => {
    cy.mount('<app-login-form></app-login-form>');
  });
});
```

form loads with all its required declarations because we registered the
ComponentsModule in the last lab.

### Test validation

```ts title=./client/src/app/components/login-form.component.ts
it('should show validation messages when inputs are blank', () => {
  cy.mount('<app-login-form></app-login-form>');
  cy.get('button').contains('Sign in').click();

  cy.contains('Email is required.');
  cy.contains('Password is required.');

  cy.get('input[type=email]').type('aaabbb');
  cy.contains('Email must be a valid email address.');
});
```

comment about multiple assertions in test

### Test Invalid Credentials

```ts title=./client/src/app/components/login-form.component.ts
it('should show bad login message when credentials are invalid', () => {
  cy.mount('<app-login-form></app-login-form>', {
    providers: [
      {
        provide: AuthService,
        useValue: {
          login: cy
            .stub()
            .as('loginSpy')
            .returns(
              throwError(() => new Error('Invalid username or password'))
            ),
        },
      },
    ],
  });
  cy.get('button').contains('Sign in').click();

  cy.get('input[type=email]').type('bad@email.com');
  cy.get('input[type=password]').type('badpass');
  cy.get('button').contains('Sign in').click();

  cy.get('@loginSpy').should(
    'have.been.calledWith',
    'bad@email.com',
    'badpass'
  );
  cy.contains('Invalid username or password');
});
```

show alternative way of intercepting http request

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

### Test valid credentials

```ts title=./client/src/app/components/login-form.component.ts
it('should login message when credentials are valid', () => {
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

add a test to make sure localStorage was set:

```ts title=./client/src/app/components/login-form.component.ts
it('should login message when credentials are valid', () => {
  //highlight-start
  const authResult = {
    access_token: 'aaa',
    user: {},
    expiresAt: 12345,
  };
  //highlight-end

  cy.intercept('POST', '/auth', {
    statusCode: 200,
    //highlight-next-line
    body: authResult,
  });

  //highlight-next-line
  cy.spy(localStorage, 'setItem').as('setItemSpy');

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

  //highlight-start
  cy.get('@setItemSpy').should(
    'have.been.calledWith',
    'auth_result',
    JSON.stringify(authResult)
  );
  //highlight-end
});
```
