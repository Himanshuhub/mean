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

app.use(express.static(__dirname + "/static"));

var server  = app.listen(8000, function() {
 console. log( "listening on port 8000");
});

var io  =  require( 'socket.io'). listen(server);
var counter = 0;
io.sockets.on( 'connection', function (socket) {
  console.log( "WE ARE USING SOCKETS!");
  console.log(socket.id);
  //all the socket code goes in here!
  socket.on( "incrementCount", function (data){
      console.log( 'Someone clicked a button!  Reason: '  + data.reason);
      counter ++;
      io.emit( 'server_response', {response:  "sockets are the best!", counter: counter});
  })

  socket.on( "reset_count", function (data){
      console.log( 'Someone clicked a reset button!  Reason: '  + data.reason);
      counter = 0;
      io.emit( 'server_reset', {response:  "sockets are the best!", counter: counter});
  })

})
