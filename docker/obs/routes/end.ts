import { Router } from "express";

const router = Router();

router.post("/end", (req, res) => {
  const { name: streamName } = req.body;

  console.log(streamName);

  res.status(200).send();
});

export default router;
