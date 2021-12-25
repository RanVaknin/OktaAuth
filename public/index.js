
var animation = bodymovin.loadAnimation({
    // animationData: { /* ... */ },
    container: document.getElementById('main_img'), // required
    path: 'animation.json', // required
    renderer: 'svg', // required
    loop: true, // optional
    autoplay: true, // optional
    name: "Demo Animation", // optional
});

const oktaSignIn = new OktaSignIn({
    baseUrl: 'https://dev-71544132.okta.com',
    redirectUri: 'http://localhost:8080/login/callback',
    clientId: '0oa3dyffcd08Ne9SE5d7',
    authParams: {
        scopes: [],
        issuer: "https://dev-71544132.okta.com/oauth2/default"
    },
    features:{
        smsRecovery: true
    }
});

let tryButton = document.getElementById("try");
let tryButton2 = document.getElementById("try2");
$(tryButton2).on("click", ()=>{
    $(signInContainer).css('visibility', function(i, v) {
        return v == 'hidden' ? 'visible' : 'hidden';
    });
})

let signInContainer = document.getElementsByClassName("login_container")[0];
$(tryButton).on("click", ()=>{
    $(signInContainer).css('visibility', function(i, v) {
        return v == 'hidden' ? 'visible' : 'hidden';
    });
})
$('#exit_wrapper').on("click", ()=>{
    $(signInContainer).css('visibility', function(i, v) {
        return v == 'hidden' ? 'visible' : 'hidden';
    });
})

$("#logout").on("click", ()=>{
    logout();
})

oktaSignIn.authClient.token.getUserInfo().then(function(user) {
    document.getElementById("messageBox").innerHTML = "Hello " + `<span style="font-weight:bold">${user.name}</span>` + "! Have a great day.";
    document.getElementById("logout").style.display = 'flex';
    document.getElementById("try").style.display = 'none';
    document.getElementById("try2").style.display = 'none';

}, function(error) {
    oktaSignIn.showSignInToGetTokens({
        el: '#osw-container',
        scopes: ['openid', 'profile']
    }).then(function(tokens) {
        oktaSignIn.authClient.tokenManager.setTokens(tokens);
        oktaSignIn.remove();

        const idToken = tokens.idToken;
        document.getElementById("messageBox").innerHTML = "Welcome " + `<span style="font-weight:bold">${idToken.claims.name}</span>` + "! You just logged in! :)";
        document.getElementById("logout").style.display = 'flex';
        document.getElementById("try").style.display = 'none';
        tryButton2.style.display = 'none';
        $(signInContainer).css('visibility', function(i, v) {
            return v == 'hidden' ? 'visible' : 'hidden';
        });
        document.getElementById("todo_title").scrollIntoView();
    }).catch((err) => console.error(err))
});
function logout() {
    oktaSignIn.authClient.signOut();
    location.reload();
}

let table = document.getElementById("tasks_table");
fetch("/tasks")
.then((res)=>res.json()
.then((data)=>{
    for(entry in data){
            let tr = document.createElement('tr');
            let name = document.createElement('td');
            name.innerText = data[entry].name;
            let deleteBtn = document.createElement('td');
            deleteBtn.innerText = 'Delete';
            deleteBtn.setAttribute('id',data[entry].id);
            deleteBtn.setAttribute('class',"remove_btn");
            setRemoveEntry(deleteBtn,data[entry].id);

            let description = document.createElement('td');
            description.innerText = data[entry].description;

            let owner = document.createElement('td');
            owner.innerText = data[entry].owner;
            tr.appendChild(name);
            tr.appendChild(description);
            tr.appendChild(owner);
            tr.appendChild(deleteBtn)
            table.appendChild(tr);
    }
}))

$('#btn').on("click", ()=>{
    const accessToken = oktaSignIn.authClient.getAccessToken();
    if (!accessToken) {
        alert("Please log in to interact with this beautiful app")
        return;
    } else {
        let tName = document.getElementById('tname').value;
        let tDescription = document.getElementById('tDescription').value;
        if(tName !== "" && tDescription !== ""){
            fetch("/tasks", {
                method: 'POST',
                body: JSON.stringify({"name" : tName, "description": tDescription}),
                headers: {
                    'Authorization': accessToken,
                    'Content-Type': 'application/json',
                }
            }).then((data)=>{
                
            })
            location.reload();
        }
    }
});

function setRemoveEntry(btn,id){
    $(btn).on("click", ()=>{
        const accessToken = oktaSignIn.authClient.getAccessToken();
        if (!accessToken) {
            alert("Please log in to interact with this beautiful app")
            return;
        } else {
            fetch(`/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: accessToken
                }
            }).then(res=>{
                if(res.status === 403){
                    alert("Only entries created by you can be deleted!")
                } else {
                    location.reload();
                }
            }).catch(err=>{
                console.error(err);
                alert("Entry ID does not exist")
            })
        }
    });
}