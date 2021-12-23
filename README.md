# Task - Okta Auth Take Home Assessment
[<img src="public/tasklogo_2.png" align="right" width="256px"/>]()

* [Overview](#Overview)
* [Getting started](#getting-started)
* [Usage guide](#usage-guide)
* [API Reference](#api-reference)
* [Known Issues](#known-issues)
* [More Thoughts](#more-thoughts)

# Overview
Task is a simple SPA allowing users to record their to-do's in a public ledger. It was built to demonstrate the implementation of the Okta sign-in widget for authentication and authorization using OAuth 2.0 OIDC and PKCE.

The app features a mock local database - ```db.json``` that will serve CRUD operations for signed in users.

The SPA's core functions are:
- Anyone can view all the tasks.
- Logged in users can add tasks.
- Logged in users can delete only their own tasks.


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
Only signed in users can use the app. Please email me at ranvaknin0@gmail.com to be set up with a user.
Once a user is created for you, you will be sent an email to set your password.
After that you will enter your phone number and will be sent a code as an MFA measure.

# Usage Guide
Once you are logged in you can add your own tasks to the public to-do list.
Once you have completed the task you can then delete your task from the records using the delete button.
