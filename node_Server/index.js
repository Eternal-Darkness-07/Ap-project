var http = require('http');
http.createServer(function (req,res){res.end();}).listen(8080);
const io = require("socket.io")(8000,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const users = {};
io.on('connection', socket => {

  socket.on('new-user-joined', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined',name);
  });

  socket.on('send', message => {
    socket.broadcast.emit('recevie', {message: message , name: users[socket.id]});
  })
  socket.on('disconnect', message => {
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
  })
});
