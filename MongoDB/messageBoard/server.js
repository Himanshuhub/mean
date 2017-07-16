var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
// define Schema variable
var Schema = mongoose.Schema;

//created Post schema // define Post Schema
var PostSchema = new mongoose.Schema({
 name: { type: String, required: true, minlength: 4},
 message: { type: String, required: true, minlength: 4},
 comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

//Created Comment Model // define Comment Schema
var CommentSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4},
 _post: {type: Schema.Types.ObjectId, ref: 'Post'},
 comment: { type: String, required: true, minlength: 4 }
}, {timestamps: true });

// set our models by passing them their respective Schemas
mongoose.model('Post', PostSchema);
// store our models in variables
var Post = mongoose.model('Post')

mongoose.model('Comment', CommentSchema);
// store our models in variables
var Comment = mongoose.model('Comment')

app.use(bodyParser.urlencoded({extended: true}));
var path = require('path');
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Root Request
app.get('/', function(req, res) {
  Post.find({})
  .populate('comments')
  .exec(function(err, posts) {
       res.render('index', {posts: posts});
         });
  });


mongoose.Promise = global.Promise;

//new post
app.post('/newPost', function(req, res) {
  var post = new Post({name: req.body.name, message: req.body.message});
  post.save(function(err) {
    if(err) {
      console.log('something went wrong');
      res.render('index', {title: 'you have errors!', errors: post.errors})
    }
    else {
      console.log('successfully added a post!');
      res.redirect('/');
    }
  })
})


// route for getting a particular post and comments
app.get('/posts/:id', function (req, res){
 Post.findOne({_id: req.params.id})
 .populate('comments')
 .exec(function(err, post) {
      res.render('post', {post: post});
        });
});

// route for creating one comment with the parent post id
app.post('/posts/:id', function (req, res){
   Post.findOne({_id: req.params.id}, function(err, post){
       // data from form on the front end
       var comment = new Comment({name: req.body.name, comment: req.body.comment});
       //  set the reference like this:
       comment._post = post._id;
       // now save both to the DB
       comment.save(function(err){
               post.comments.push(comment);
               post.save(function(err){
                    if(err) {
                         console.log('Error');
                    } else {
                         res.redirect('/');
                    }
                });
        });
   });
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})
