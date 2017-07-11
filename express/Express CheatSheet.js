1. create parent project directory
mkdir {directory}

2. Create a server.js file in directory
cd {directory}
touch server.js
mkdir static
mkdir views


3. open server.js file in atom and insert
var http = require('http');
var fs = require('fs');
var express = require("express");
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var session = require('express-session');

// more new code:
app.use(session({secret: 'codingdojorocks'}));  // string for encryption
app.post('/users', function (req, res){
    // set the name property of session.
    req.session.name = req.body.name;
    console.log(req.session.name);
    //code to add user to db goes here!
    // redirect the user back to the root route.
    res.redirect('/');
});


app.get('/', function(request, response) {
  response.send("<h1>Hello Express</h1>");
})


// root route
app.get('/', function (req, res){
  res.render('index', {title: "my Express project"});
});

// route to process new user form data:
app.post('/users', function (req, res){
  //code to add user to db goes here!
})

// route to process new user form data:
app.post('/users', function (req, res){
  // code to add user to db goes here!
  // redirect the user back to the root route.
  // All we do is specify the URL we want to go to:
  res.redirect('/');
})

// POST data
// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));

// route to process new user form data:
app.post('/users', function (req, res){
    console.log("POST DATA \n\n", req.body)
    //code to add user to db goes here!
    // redirect the user back to the root route.
    res.redirect('/')
});

//Data from URL (GET data)
app.get("/users/:id", function (req, res){
    console.log("The user id requested is:", req.params.id);
    // just to illustrate that req.params is usable here:
    res.send("You requested the user with id: " + req.params.id);
    // code to get user from db goes here, etc...
});



app.get("/users", function (request, response){
    // hard-coded user data
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"},
        {name: "Jay", email: "jay@codingdojo.com"},
        {name: "Brendan", email: "brendan@codingdojo.com"},
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('users', {users: users_array});
})


app.listen(8000, function() {
  console.log("listening on port 8000");
})

4. npm install
npm install express --save
npm install ejs --save
npm install express-session --save
npm install body-parser --save


-- Under static folder create html file
cd static/
touch main.html
<body>
  <h1>This is a Static HTML page!</h1>
</body>


--- under views folder
cd ../views
touch index.ejs
vim index.ejs
<form action='/users' method='post'>
    Name: <input type='text' name='name'>
    Email: <input type='text' name='email'>
    <input type='submit' value='create user'>
</form>


touch users.ejs
vim users.ejs
i
<html>
<body>
    <h2>Here are all the users:</h2>
    <% for (var x in users) { %>
        <h3>Name: <%= users[x].name %></h3>
        <h4>Email: <%= users[x].email %></h4>
        <hr>
    <% } %>
</body>
</html>

cd ..
nodemon server.js
