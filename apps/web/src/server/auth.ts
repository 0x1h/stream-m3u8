import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";

import { db } from "@/server/db";
import Google from "next-auth/providers/google";
import { env } from "@/env";
import Twitch from "next-auth/providers/twitch";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      streamKey: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const findUser = await db.user.findUnique({
        where: { id: user.id },
        select: { streamKey: true },
      });

      return {
        ...session,
        user: {
          ...session.user,
          streamKey: findUser?.streamKey,
          id: user.id,
        },
      };
    },
    jwt: ({ token, session }) => {
      token.streamKey = session.streamKey;
      token.id = session.id;

      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Twitch({
      clientId: env.TWITCH_CLIENT_ID,
      clientSecret: env.TWITCH_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
