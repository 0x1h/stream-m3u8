import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_SECRET: z.string(),
    TWITCH_CLIENT_ID: z.string(),
    TWITCH_SECRET: z.string(),
  },

  client: {
    NEXT_PUBLIC_SOCKET: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SOCKET: process.env.NEXT_PUBLIC_SOCKET,
    TWITCH_SECRET: process.env.TWITCH_SECRET,
    TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
