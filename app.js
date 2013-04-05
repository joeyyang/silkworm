var express = require('express')
    // , express.static(__dirname, + "/public")
    // app = express.createServer(),
    , app=express()
    , http=require('http')
    , server = http.createServer(app)
    , io = require('socket.io').listen(server)
    // io = require('socket.io').listen(app),
    
    ,  st = require('node-static')
    ,  jquery = require('jquery')
    ,  sys = require('util')
    ,  exec = require('child_process').exec
    ,  platform = process.platform
    ,  click_script = null;


server.listen(8080);

app.use(express.static(__dirname + "/public"));

app.get('/browser', function (req, res) {
  // debugger;
  console.log(__dirname);
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/phone', function (req, res) {
  res.sendfile(__dirname + '/phone.html');
});

app.get('/control', function (req, res) {
  res.sendfile(__dirname + '/control.html');
});

io.sockets.on('connection', function (socket) {  
  console.log('a message');
  socket.emit('from server', {hello:'client'});
  socket.on('from client', function(data){console.log(data);});
  socket.on('from control', function(data){console.log(data);});

  socket.on('motion', function(data){
    socket.broadcast.emit('motion', data);
  });

  socket.on('touchstart', function(data){
      socket.broadcast.emit('touchstart', data);
  });
  
  socket.on('touchmove', function(data){
      socket.broadcast.emit('touchmove', data);
  });
  
  socket.on('touchend', function(data){
      socket.broadcast.emit('touchend', data);
  });
  socket.on('switch', function(data){
    socket.broadcast.emit('switch', data);
  });
  socket.on('control', function(data){
    socket.broadcast.emit('control', data);
  });

});