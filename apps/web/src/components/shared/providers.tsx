"use client"
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <TRPCReactProvider>
      <SessionProvider>{children}</SessionProvider>
    </TRPCReactProvider>
  );
};
