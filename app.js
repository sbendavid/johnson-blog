require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");

const app = express();
const socket = require("socket.io");
const PORT = 3000 ||  process.env.PORT;

const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });

app.use(express.static("public"));
app.use('/lib', express.static(__dirname + '/lib'));

// Template Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs")

//Route setup
app.use(("/"), require("./server/routes/main"));

// Socket setup
const io = socket(server);

const activeUsers = new Set();
io.on("connection", function (socket) {
    console.log("Made socket connection");
  
    socket.on("new user", function (data) {
      socket.userId = data;
      activeUsers.add(data);
      io.emit("new user", [...activeUsers]);
    });
  
    socket.on("disconnect", function () {
        activeUsers.delete(socket.userId);
        io.emit("user disconnected", socket.userId);
      });
  
      socket.on("chat message", function (data) {
        io.emit("chat message", data);
    });
  });
