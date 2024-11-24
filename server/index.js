const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT;
const corsOptions = {
  cors: true,
  origins: [
    "https://vue-realtime-chat-app.vercel.app",
    "http://localhost:3000",
    "http://localhost:5000",
  ],
  methods: ["GET", "POST"],
  credentials: true,
};
const MAX_USERS = 1;

const io = new Server(server, corsOptions);
app.use(express.static("public"));
app.use(cors());

io.on("connection", (socket) => {
  const totalUsers = io.engine.clientsCount;
  if (totalUsers > MAX_USERS) {
    socket.emit("error", {
      text: "Sorry, the room is full.",
    });
    socket.disconnect();
    return;
  }

  socket.on("chat", (data) => {
    const { nickname, message } = data;
    io.emit("messages", {
      text: message,
      nickname: nickname,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const updatedTotalUsers = io.engine.clientsCount;
    io.emit("totalUsers", updatedTotalUsers);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
