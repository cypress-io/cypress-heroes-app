---
slug: /
---

# Getting Started

Welcome to the Cypress for Angular Devs Workshop!

This workshop covers new features Cypress has in store for Angular devs.

To get started, clone the repo and install the dependencies if you haven't
already:

```bash
git clone https://github.com/cypress-io/cypress-heroes-app.git
```

The repo folder contains two pertinent folders:

- **client**: The Angular front-end app
- **server**: NestJS back-end app that provides the api

Go into the repo's folder and install the dependencies:

```bash
cd cypress-heroes-app
npm install
```

This will install the dependencies for both apps.

The client app is where we will spend the majority of our time. Open the
**client** folder from whatever code editor you wish to use (we'll be using [VS Code](https://code.visualstudio.com/) in this guide), and start the
development server:

```bash
cd client
code .
npm start
```

The `start` script starts up both the client and server apps.

To start the app run the

## Login

The app comes with two logins, a normal user and an admin user. The credentials
for them are:

- **Normal User**: username: test@test.com, password: test123
- **Admin User**: username: admin@test.com, password: test123
```
