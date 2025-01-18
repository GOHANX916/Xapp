const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (your HTML file)
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for messages from the client
  socket.on("sendMessage", (message) => {
    // Broadcast the message to all clients except the sender
    socket.broadcast.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Set up the server to listen on port 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
