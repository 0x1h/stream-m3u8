import express from "express";
import dotenv from "dotenv";

import auth from "./routes/auth";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", auth);
app.post("/auth", (req, res) => {
  const { key: streamKey } = req.body;

  if (streamKey === "supersecret") {
    res.status(200).send();
    return;
  }

  res.status(403).send();
});

app.post("/ended", (req, res) => {
  const { name: streamName } = req.body;

  console.log(streamName);

  res.status(200).send();
});

app.listen(8000, () => {
  console.log("SERVER:UP");
});
