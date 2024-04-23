import type { Request, Response, NextFunction } from "express";
import { prisma } from "@/index";
import { decodeCookies } from "@/utils/decode-cookies";

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const session = await decodeCookies(token as string);
    if (!session?.sub) {
      return res.status(401).send({
        message: "Invalid Credentials",
      });
    }

    const tokenExpiration = new Date(Number(session.exp)).getTime();
    const currentDateInSeconds = Number(
      new Date().getTime().toString().slice(0, -3)
    );

    if (tokenExpiration < currentDateInSeconds) {
      return res.status(401).send({
        message: "Credentials Expired",
      });
    }

    const user = await prisma.user.findFirst({
      where: { id: session.sub as string },
    });

    if (!user?.id) {
      return res.status(404).send({
        message: "User does not exist",
      });
    }

    await prisma.$disconnect();

    next();
  } catch (err) {
    return res.status(401).send({
      message: "Invalid Credentials",
      devMessage: `SHOW THIS MESSAGE TO DEVELOPER: ${err}`,
    });
  }
};
