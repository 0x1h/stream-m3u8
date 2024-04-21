"use client";
import { GoogleIcon } from "@/icons/google";
import { TwitchIcon } from "@/icons/twitch";
import { Loader2 } from "lucide-react";
import { Button } from "@/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { useState } from "react";
import { signIn } from "next-auth/react";

const AuthDialog = () => {
  const [loading, setLoading] = useState<"twitch" | "google" | "">("");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="uppercase">Authorize</DialogTitle>
        <DialogDescription>
          Authorize with Google or Twitch to securely access our services. Enjoy
          seamless authentication and personalized experiences tailored just for
          you!
        </DialogDescription>
        <DialogFooter className="w-full">
          <div className="mt-6 flex w-full flex-col gap-y-3">
            <Button
              variant="white"
              disabled={!!loading}
              className="flex w-full items-center justify-center gap-3"
              onClick={async () => {
                setLoading("google");
                await signIn("google");
              }}
            >
              {loading === "google" ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              <span className="font-bold">Google</span>
            </Button>
            <Button
              disabled={!!loading}
              variant="white"
              className="flex w-full items-center justify-center gap-3"
              onClick={async () => {
                setLoading("twitch");
                await signIn("twitch");
              }}
            >
              {loading === "twitch" ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <TwitchIcon />
              )}
              <span className="font-bold">Twitch</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  );
};

export default AuthDialog;
