// imports \\
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const tasks = require("./db");
const uuid = require("short-uuid");
const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: "https://dev-71544132.okta.com/oauth2/default",
});

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// controller \\
app.use(express.static(path.join(__dirname, "public")));

// get all tasks
app.get("/tasks", (req, res) => {
    let obscuredEmailTasks = [...tasks.values()].map((task) => ({
        id: task.id,
        name: task.name,
        description: task.description,
        owner: obscureEmail(task.email),
    }));
    res.send(obscuredEmailTasks);
});

// Verify that the user is logged in, if they are allow to add a task.
app.post("/tasks", jsonParser, async (req, res) => {
    try {
        // make sure this token came from okta
        const jwt = await oktaJwtVerifier.verifyAccessToken(req.headers.authorization, "api://default");
        const name = req.body.name;
        const description = req.body.description;
        const email = jwt.claims.sub;
        const id = uuid.generate();
        tasks.set(id, { id: id, name: name, description: description, email: email });
        res.status(200);
    } catch (error) {
        console.warn("token failed validation");
        res.status(500);
    }
});

// Verify the user is logged in, only then check that the selected task is owned by the user. if it is then delete it.
app.delete("/tasks/:id", async (req, res) => {
    try {
        const jwt = await oktaJwtVerifier.verifyAccessToken(req.headers.authorization, "api://default");
        const taskId = req.params.id;
        const email = jwt.claims.sub;

        // verify task ownership
        if (email !== tasks.get(taskId).email) {
            res.status(403).send({ message: "You can only delete entries created by you." });
            return;
        }

        tasks.delete(taskId);
        res.status(200).send({ message: "Entry removed successfully", tasks: tasks });
    } catch (error) {
        console.warn("token failed validation");
        console.log(err);
        res.status(500);
    }
});

// utility functions
function obscureEmail(emailString) {
    let splitEmail = emailString.split("@");
    let domain = splitEmail[1];
    let name = splitEmail[0];
    return name.substring(0, 3).concat("*********@").concat(domain);
}

app.listen(port);
console.log("listening on: " + port);
