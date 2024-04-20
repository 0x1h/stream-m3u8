import express from "express";
import dotenv from "dotenv";

import auth from "./routes/auth";
import end from "./routes/end";
import { PrismaClient } from "@prisma/client";

dotenv.config();
export const prisma = new PrismaClient();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", auth);
app.use("/", end);

app.listen(8000, () => {
  console.log("SERVER:UP");
});
