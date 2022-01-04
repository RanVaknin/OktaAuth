# Task - Okta Auth Take Home Assessment

[<img src="public/tasklogo_2.png" align="right" width="256px"/>]()

-   [Overview](#Overview)
-   [Getting started](#getting-started)
-   [Usage guide](#usage-guide)
-   [Known Issues](#known-issues)

# Overview

Task is a simple SPA allowing users to record their to-do's in a public ledger. It was built to demonstrate the implementation of the Okta sign-in widget for authentication and authorization using Authorization Code Flow with PKCE.

The app features a mock local database - `db.json` that will serve CRUD operations for signed in users.

The SPA's core functions are:

-   Anyone can view all the tasks.
-   Logged in users can add tasks.
-   Logged in users can delete only their own tasks.

# Getting started

#### From your terminal:

```javascript
git clone https://github.com/RanVaknin/OktaAuth.git

cd OktaAuth
```

#### Install dependencies and serve project locally

```javascript
npm install

nodemon app.js
```

#### Credentials

You can sign up for a user account. Once an account is created, an SMS message will be sent to you as an MFA measure. Then you will be able to use the app.

# Usage Guide

Once you are logged in you can add your own tasks to the public to-do list.
Once you have completed the task you can then delete your task from the records using the delete button.

# Known Issues

-   The login widget is not customized since I did not see a way to customize it without hosting it on my own domain.

-   Right now the first login SMS MFA flow is working but is not set up from the "Sign On Policy" section of the developer console. In order to enable it through the Sign On Policy users are needed to be redirected thus not using PKCE but rather the standard code grant flow.
