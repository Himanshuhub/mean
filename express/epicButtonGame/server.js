var express = require("express");
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var counter = 0;

app.get('/', function(req, res) {
  res.render('index', {counter: counter});
})

app.post('/reset', function(req, res) {
  counter = 0;
  res.redirect('/');
})

app.post('/epicbutton', function(req, res) {
  counter++
  res.redirect('/');
})


app.use(express.static(__dirname + "/static"));

app.listen(8000, function() {
  console.log("listening on port 8000");
})
