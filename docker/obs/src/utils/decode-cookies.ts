import { decode } from "next-auth/jwt";

export const decodeCookies = async (token: string) => {
  const session = await decode({
    secret: process.env.NEXTAUTH_SECRET || "",
    token,
  });

  return session
};