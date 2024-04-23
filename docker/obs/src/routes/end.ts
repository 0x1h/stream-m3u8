import { Router } from "express";
import { prisma } from "..";

const router = Router();

router.post("/end", async (req, res) => {
  try {
    await prisma.$connect();
    const { key } = req.body;

    if (!key) {
      res.status(403).send();
      return;
    }

    await prisma.stream.delete({ where: { key } });
    res.status(200).send();
  } catch {
    await prisma.$disconnect();
  }
});

export default router;
