import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();

import auth from "./routes/auth";
import end from "./routes/end";
import { PrismaClient } from "@prisma/client";
import http from "http";
import { streamSocket } from "./sockets/stream";

const app = express();
export const prisma = new PrismaClient();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  streamSocket(socket, io);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", auth);
app.use("/", end);

server.listen(8000, () => {
  console.log("Server is running");
  console.log("Socket is listening");
});
