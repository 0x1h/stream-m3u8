import { test } from "@/src/server/api/routers/test";
import { createCallerFactory, createTRPCRouter } from "@/src/server/api/trpc";

export const appRouter = createTRPCRouter({
  test,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
