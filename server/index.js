const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const cors = require('cors');
const db = require('./db');
// const Post = require('./models/post-model');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// setInterval( function() {
//   let current = new Date();
//    Post.updateMany({ endTime: {$lte: current} },{$set: { archived: true }}, (err) => {
//     if(err) return console.log("Error while updating posts: " + err);
//     console.log("successfully updated posts")
//   })
// }, 60 * 1000);

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