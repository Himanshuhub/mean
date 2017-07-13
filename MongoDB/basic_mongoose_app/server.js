var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
 name: { type: String, required: true, minlength: 6},
 quote: { type: String, required: true, minlength: 6}
}, {timestamps: true})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

app.use(bodyParser.urlencoded({extended: true}));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
// Root Request
app.get('/', function(req, res) {
  res.render('index');
})

app.get('/quotes', function(req, res) {
  User.find({}, function(err,data){
    res.render('quotes', {users:data});
  })
})

mongoose.Promise = global.Promise;

app.post('/quotes', function(req, res) {
  console.log("POST DATA", req.body);
  var user = new User({name: req.body.name, quote: req.body.quote});
  user.save(function(err) {
    if(err) {
      console.log('something went wrong');
      res.render('index', {title: 'you have errors!', errors: user.errors})
    }
    else {
      console.log('successfully added a user!');
      res.redirect('/quotes');
    }
  })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})
