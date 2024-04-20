import { publicProcedure } from "@/src/server/api/trpc";
import { z } from "zod";

export const test = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(() => {
    return {
      msg: "heyy",
    };
  });
