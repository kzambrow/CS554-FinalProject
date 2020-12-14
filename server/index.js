const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

configRoutes(app);
server = app.listen(5000, function() {
  console.log('socket server running on port 5000')
});

io = socket(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on("SEND_MESSAGE", function(data){
    io.emit("RECEIVE_MESSAGE", data);
  })

  socket.on('disconnect', function() {
    console.log("disconnect: ", socket.id);
  })
})
