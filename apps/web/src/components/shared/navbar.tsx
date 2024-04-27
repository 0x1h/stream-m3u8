"use client";
import { Button } from "@/ui/button";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import Link from "next/link";
import dynamic from "next/dynamic";
const AuthDialog = dynamic(() => import("@/components/shared/dialogs/auth"));
const CredentialsDialog = dynamic(
  () => import("@/components/shared/dialogs/credentials"),
);
import { Dialog, DialogTrigger } from "@/ui/dialog";
import { useState } from "react";
import { LogoutIcon } from "@/icons/log-out";
import { KeyIcon } from "@/icons/key";
import { LiveIcon } from "@/icons/live";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [openCreds, setOpenCreds] = useState(false);

  return (
    <nav className="w-full border-b">
      <div className="container flex items-center justify-between py-3">
        <Link href="/">
          <Image
            draggable="false"
            src="/icon.webp"
            width={40}
            height={40}
            alt="icon"
            className="h-auto w-auto cursor-pointer"
          />
        </Link>
        <div className="flex items-center gap-3">
          {status === "authenticated" && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Link href="/stream">
                    <Button size={"icon"} variant={"secondary"}>
                      <LiveIcon className="size-4" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">Start Stream</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {status === "unauthenticated" ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Authorize</Button>
              </DialogTrigger>
              <AuthDialog />
            </Dialog>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {session?.user.image ? (
                  <Image
                    src={session?.user.image as string}
                    alt={session?.user.name ?? "name"}
                    width={40}
                    height={40}
                    className="cursor-pointer rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 animate-pulse rounded-full bg-secondary" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="flex items-center gap-3"
                  onClick={() => setOpenCreds(true)}
                >
                  <KeyIcon className="size-4" />
                  <span>Credentials</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 text-red-500 hover:bg-red-500/15"
                  onClick={async () => await signOut()}
                >
                  <LogoutIcon className="size-4 text-red-500" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Dialog open={openCreds} onOpenChange={(open) => setOpenCreds(open)}>
          <CredentialsDialog />
        </Dialog>
      </div>
    </nav>
  );
};
