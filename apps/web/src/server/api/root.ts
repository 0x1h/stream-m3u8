import { test } from "@/server/api/routers/test";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  test,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
