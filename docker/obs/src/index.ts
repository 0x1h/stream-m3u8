import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();

import auth from "./routes/auth";
import end from "./routes/end";
import { PrismaClient } from "@prisma/client";
import http from "http";
import cors from "cors";
import { streamSocket } from "./sockets/stream";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

export const prisma = new PrismaClient();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  streamSocket(socket, io);
});


app.use("/", auth);
app.use("/", end);

server.listen(8000, () => {
  console.log("Server is running");
  console.log("Socket is listening");
});
