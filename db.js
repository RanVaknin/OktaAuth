// module.exports = {
//         "k1EiC3b4YbwLTBmhPXNabM": {name: "Brush teeth", description: "Need to brush teeth when i get up in the morning", email:"test123@gmail.com"},
//         "1xnUZEAMgLthmrfAXK3q3e": {name: "Car Service", description: "Take the car to autozone to get an oil change and service", email:"test123@gmail.com"},
//         "6WVSfFbucDhDMyznP6p5Dc": {name: "Pick up Molly", description: "Pick up Molly from the kindergarten at 4:00PM", email:"test123@gmail.com"}
// }

let tasks = new Map();
tasks.set("k1EiC3b4YbwLTBmhPXNabM", {id:"k1EiC3b4YbwLTBmhPXNabM",  name: "Brush teeth", description: "Need to brush teeth when i get up in the morning", email:"test123@gmail.com"});
tasks.set("1xnUZEAMgLthmrfAXK3q3e", {id:"1xnUZEAMgLthmrfAXK3q3e", name: "Car Service", description: "Take the car to autozone to get an oil change and service", email:"test123@gmail.com"});
tasks.set("6WVSfFbucDhDMyznP6p5Dc", {id:"6WVSfFbucDhDMyznP6p5Dc", name: "Pick up Molly", description: "Pick up Molly from the kindergarten at 4:00PM", email:"test123@gmail.com"});

module.exports = tasks;