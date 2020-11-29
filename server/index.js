const express = require('express');
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const configRoutes = require('./routes');

io.on('connection', socket => {
  socket.emit("your id", socket.id);
  socket.on("send message", body => {
    io.broadcast.emit("message", body)
  })
  })

server.listen(8000, () => console.log("socket server is running on port 8000"));


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