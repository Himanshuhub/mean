// Load the express module (Where do you think this comes from?)
var express = require("express");
var session = require('express-session');
var app = express();

// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));

// invoke var express and store the resulting application in var app
app.set('view engine', 'ejs');
app.use(session({secret: 'codingdojorocks'}));  // string for encryption

// lets handle the base route "/" and respond with "Hello Express"
app.get('/', function(request, response) {
  if (!request.session.name) {
    request.session.name = 1;
  }
  else{
    request.session.name += 1;
  }
  response.render('index', {counter: request.session.name});
})
// notice that the function is app.get(...) why do you think the function is called get?

app.post('/addtwo', function(request, response) {
  request.session.name += 1;
  response.redirect('/');
})

app.post('/res', function(request, response) {
  request.session.name += 1;
  response.redirect('/');
})

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it

// app - use, set, get/post, listen











// Tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
// this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)
