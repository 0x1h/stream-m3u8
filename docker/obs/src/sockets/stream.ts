import { Socket } from "socket.io";
import { io as IO, prisma } from "..";

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
      } else {
        io.to(`stream:${id}`).emit(`stream:${id}`, "[ENDED]");
      }
    }, 2000);

    socket.on("disconnect", () => clearInterval(intervalId));
  });
};
