// imports \\
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const tasks = require('./db');
const short = require('short-uuid');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-71544132.okta.com/oauth2/default' 
});

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

// controller \\
app.use(express.static(path.join(__dirname, 'public')));


// get all tasks
app.get('/tasks', (req,res) =>{
    let newArr = [];
    [...tasks.values()].forEach(t=>{
        let owner = obscureEmail(t.email);
        newArr.push((({id, name,description}) => ({id,name,description,owner}))(t))
    })
    res.send(newArr);
});

// add a new task
app.post('/tasks', jsonParser,  (req,res) =>{
    oktaJwtVerifier.verifyAccessToken(req.headers.authorization, 'api://default')
    .then(jwt => {
        let name = req.body.name;
        let description = req.body.description;
        let email = jwt.claims.sub;
        let id = short.generate();
        tasks.set(id, {"id": id, "name": name, "description": description,"email":email})
        console.log(tasks)
        res.status(200);
    } )
    .catch(err => console.warn('token failed validation') );
})

app.delete('/tasks/:id', (req,res) => {
        oktaJwtVerifier.verifyAccessToken(req.headers.authorization, 'api://default')
        .then(jwt => {
                let taskId = req.params.id;
                let email = jwt.claims.sub;
                console.log(email,tasks.get(taskId))
                if(email === tasks.get(taskId).email){
                    tasks.delete(taskId);
                    res.status(200).send({"message": "Entry removed successfully", "tasks": tasks});
                } else {
                    res.status(403).send({"message": "You can only delete entries created by you."});
                }
        })
        .catch(err => {
            console.warn('token failed validation');
            console.log(err);
        });
})

// utility functions
function obscureEmail(emailString){
    let splitEmail = emailString.split("@")
    let domain = splitEmail[1];
    let name = splitEmail[0];
    return  name.substring(0,3).concat("*********@").concat(domain)
}

app.listen(port);
console.log("listening on: " + port);