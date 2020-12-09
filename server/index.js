const express = require('express');
const socket = require('socket.io');
const app = express();
const configRoutes = require('./routes');

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
// app.use();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.engine('handlebars', handlebarsInstance.engine);
// app.set('view engine', 'handlebars');

// configRoutes(app);

// app.listen(3000, () => {
//   console.log("We've now got a server!");
//   console.log('Your routes will be running on http://localhost:3000');
// });