import express from "express";
import dotenv from "dotenv";

import auth from "./routes/auth";
import end from "./routes/end";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", auth);
app.use('/', end)

app.listen(8000, () => {
  console.log("SERVER:UP");
});
