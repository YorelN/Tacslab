const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const http = require("http");
const port = 8080;

const app = express();
const server = http.createServer(app);

const io = socketio(server);

io.on("connection", socket => {
  socket.on("connect", function(data) {
    console.log(`New client: [ ${data} ]`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
