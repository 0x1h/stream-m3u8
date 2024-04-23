import { Socket } from "socket.io";
import { io as IO, prisma } from "..";
import { PrismaClient } from "@prisma/client";

export const streamSocket = (socket: Socket, io: typeof IO) => {
  socket.on("stream", (id) => {
    socket.join(`stream:${id}`);

    const intervalId = setInterval(async () => {
      const stream = await prisma.stream.findFirst({
        where: { userId: id },
        select: { user: { select: { name: true } } },
      });

      if (stream) {
        io.to(`stream:${id}`).emit(`stream:${id}`, stream.user.name);
      }
    }, 2000);

    socket.on("disconnect", () => clearInterval(intervalId));
  });
};
