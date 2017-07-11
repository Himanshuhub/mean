var express = require("express");
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var session = require('express-session');


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

app.listen(8000, function() {
  console.log("listening on port 8000");
})
