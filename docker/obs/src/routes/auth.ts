import { Router } from "express";
import { prisma } from "..";

const router = Router();

router.post("/auth", async (req, res) => {
  try {
    const { key: streamKey, name } = req.body;

    if (!streamKey) {
      res.status(403).send();
      return;
    }

    const findName = await prisma.user.findUnique({ where: { name } });

    if (!findName) {
      res.status(403).send();
      return;
    }

    if (findName.streamKey !== streamKey) {
      res.status(403).send();
      return;
    }

    await prisma.stream.create({ data: { userId: findName.id, key: streamKey} });

    return res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

export default router;
