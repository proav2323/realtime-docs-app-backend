import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("textChange", (data) => {
    socket.to(data.room).emit("recieveText", data.text);
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });
});

httpServer.listen(3000, () => {
  console.log("server listening");
});
