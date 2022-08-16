---
slug: /
---

# Getting Started

Welcome to the Cypress for Angular Devs Workshop!

This workshop covers new features Cypress has in store for Angular devs.

To get started, clone the repo and install the dependencies:

## Clone Repo and Install Dependencies

```bash
git clone https://github.com/cypress-io/cypress-heroes-app.git
```

Go into the repo's folder and install the dependencies:

```bash
cd cypress-heroes-app
npm install
```

The repo folder contains two pertinent folders:

- **client**: The Angular front-end app
- **server**: NestJS back-end app that provides the API

Running `npm install` from above installs the dependencies for both apps.

## Start App

The client app is where we will spend the majority of our time. Open the
**client** folder from whatever code editor you wish to use (we'll be using
[VS Code](https://code.visualstudio.com/) in this guide), and start the
development server:

```bash
cd client
code .
npm start
```

The `start` script starts up both the client and server apps.

Once done, the app will launch at
[http://localhost:4200](http://localhost:4200).

## Get to Know the App

The Cypress Heroes app is a take on the classic Angular Tour of Heroes tutorial
application. The app displays a list of heroes for hire. You can view the hero's
contract price, the number of fans (likes) the hero has, and the number of saves
(completed jobs). Heroes can be created, edited, and deleted.

The app features a few different pages and several components that provide a
good starting point to learn testing with Cypress.

Some features of the app include:

- Multi-page with serval components
- Authentication
- API calls to a real back-end
- Forms

Attempting to click the like or hire icons will result in being prompted to log
into the app. There are two baked-in logins, a normal user and an admin user
with elevated permissions. Here are the credentials for the logins:

- **Normal User**: username: test@test.com, password: test123
- **Admin User**: username: admin@test.com, password: test123

Logging in as a normal user will allow you to like and hire the hero. Notice
that when doing so, the number of fans and saves increases (respectively).

You gain access to add, edit, and delete heroes as an admin user.
