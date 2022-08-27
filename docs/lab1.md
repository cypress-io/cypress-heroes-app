# Lab1 - Protractor Migration

Welcome to this lab on how to migrate from Protractor tests to Cypress.

## Getting Started

To get started, make checkout the `lab1-start` branch:

```
git checkout lab1-start
```

You can find a completed version of this lab in the [lab1-complete](https://github.com/cypress-io/cypress-heroes-app/tree/lab1-complete) branch.

If the app is not currently running, start it:

```bash title='./client'
npm run start
```

## Protractor Tests

This branch contains a few Protractor tests in the **./client/e2e/src/app.e2e-spec.js** file.

```ts title=./client/e2e/src/app.e2e-spec.js
describe("Angular App", () => {
  beforeEach(() => {
    browser.get("/");
  });

  it("checks title", () => {
    expect(browser.getTitle()).toEqual("CyHeroes");
  });

  it("can login", () => {
    expect(element(by.id("login")).getText()).toEqual("Login");
    browser
      .actions()
      .click(element(by.id("login")))
      .perform();

    element(by.id("login-email")).sendKeys("test@test.com");
    element(by.id("login-password")).sendKeys("test123");

    browser
      .actions()
      .click(element(by.id("signin")))
      .perform();

    expect(element(by.id("logout")).getText()).toEqual("Logout");
  });

  it("displays heroes", () => {
    expect(element.all(by.css("app-hero-list li")).count()).not.toEqual(0);
  });
});
```

The spec contains some tests to verify the basic functionality of the app. Let's
give them a try by running the `ng e2e` command:

```bash title='./client'
ng e2e
```

> If you experience an "ECONNRESET" error starting the tests, try running the `ng e2e` command again.

And the tests pass:

![Protractor Tests Pass](/img/protractor-tests-pass.jpg)

> You might have noticed the deprecation notice like the one above. No worries,
> that's why we are here!

## Using the Cypress Schematic

The easiest way to get up and running with Cypress in Angular is to use the
[Cypress Schematic](https://github.com/cypress-io/cypress/tree/master/npm/cypress-schematic).
Add it to the project in the **client** folder:

```bash title=./client
ng add @cypress/schematic
```

When prompted, select **No** to default `ng e2e` to use Cypress, and **No** when
asked to add Cypress Component Testing (we'll do that later).

After the schematic runs, Cypress will be installed, configured, and ready to
go. Launch it by running:

```bash title=./client
npm run cypress:open
```

When Cypress launches, you choose whether you want to do end-to-end or component testing. We are converting end-to-end Protractor tests, so choose E2E Testing here.

![Choose Testing Type](/img/choose-testing-type.jpg)

Next, choose what browser you want to use for testing and click the start button.

After the browser opens, select the **spec.cy.ts** spec. When the spec runs, you'll get a 404 error because Cypress does not know what address to find your site. We can fix this by updating the Cypress configuration file and adding a `baseUrl` to point to the local development server:

```ts {5} title=./client/cypress.config.ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

When you save the config file, Cypress will automatically reload with the new settings. When you run the spec again, you'll see it pulls up the home page now, but the spec still fails because the test looks for text that doesn't exist in our app.

We won't worry about this for now, as we are about to take the Protractor test and convert it to a Cypress spec.

## Using the Cypress Migrator 

The Cypress Migrator is an online tool to assist you with converting Protractor tests to Cypress. Open the migrator by going to [migrator.cypress.com](https://migrator.cypress.io/).

You will see two code editors side by side. An example Protractor test is pre-filled on the left. Go ahead and click the "Migrate to Cypress" button and see how it takes the Protractor code and converts it into code that uses the Cypress APIs.

Let's give this a go using the Protractor test in our app. Open the **./client/e2e/src/app.e2e-spec.js** file and copy the `describe` block from the file into your clipboard. Then go into the Cypress Migrator, paste the code into the left editor, and click the migrate button.

> If you copied the require statements, you must remove them manually.

Copy the Cypress code from the right editor and replace the contents of **./client/cypress/e2e/spec.cy.ts** with it. When saved, the spec will automatically rerun, and you should see passing tests in the test runner:

![E2E Specs Pass](/img/e2e-specs-pass.jpg)

## More Info

In this lab, we took a fairly simple Protractor test and used the Cypress Migrator to convert the test to Cypress. To go more in-depth on Protractor migration, we have a complete [Protractor Migration Guide](https://docs.cypress.io/guides/end-to-end-testing/protractor-to-cypress) to help you along.
