"use client";
import { env } from "@/env";
import { CopyIcon } from "@/icons/copy";
import { EyeIcon } from "@/icons/eye";
import { TickIcon } from "@/icons/tick";
import { Button } from "@/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { useSession } from "next-auth/react";
import { useState } from "react";

const CredentialsDialog = () => {
  const [server, setServer] = useState({ copy: false });
  const [streamKey, setStreamKey] = useState({ show: false, copy: false });
  const { data: session } = useSession();

  const onChange = (key: "server" | "streamkey", value: "show" | "copy") => {
    if (key === "server") {
      setServer((prev) => ({ ...prev, [value]: true }));
      navigator.clipboard.writeText(env.NEXT_PUBLIC_RTMP_SERVER);
      setTimeout(() => {
        setServer((prev) => ({ ...prev, [value]: false }));
      }, 1000);
    }

    if (key === "streamkey") {
      if (value === "show") {
        setStreamKey((prev) => ({ ...prev, show: !prev.show }));
        return;
      }
      setStreamKey((prev) => ({ ...prev, [value]: true }));
      navigator.clipboard.writeText(
        `${session?.user.name}?key=${session?.user.streamKey}`,
      );
      setTimeout(() => {
        setStreamKey((prev) => ({ ...prev, [value]: false }));
      }, 1000);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="uppercase">credentials</DialogTitle>
        <div>
          <DialogDescription className="mt-3">
            Please input your credentials in the custom stream settings of your
            streaming software
          </DialogDescription>
          <div className="mb-3 mt-3 space-y-3">
            <div>
              <Label className="uppercase">server</Label>
              <div className="relative flex items-center">
                <Input
                  value={env.NEXT_PUBLIC_RTMP_SERVER}
                  readOnly
                  className="pr-10"
                />
                {!server.copy ? (
                  <CopyIcon
                    className="absolute right-4 size-4 cursor-pointer"
                    onClick={() => onChange("server", "copy")}
                  />
                ) : (
                  <TickIcon className="absolute right-4 size-4 text-green-500" />
                )}
              </div>
            </div>
            <div>
              <Label className="uppercase">stream key</Label>
              <div className="relative flex items-center">
                <Input
                  readOnly
                  className="pr-16"
                  value={
                    !streamKey.show
                      ? "********"
                      : `${session?.user.name}?key=${session?.user.streamKey}`
                  }
                />
                <EyeIcon
                  className="absolute right-4 size-4 cursor-pointer"
                  onClick={() => onChange("streamkey", "show")}
                />
                {!streamKey.copy ? (
                  <CopyIcon
                    className="absolute right-10 size-4 cursor-pointer"
                    onClick={() => onChange("streamkey", "copy")}
                  />
                ) : (
                  <TickIcon className="absolute right-10 size-4 text-green-500" />
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogClose asChild>
          <Button variant={"white"}>Got it</Button>
        </DialogClose>
      </DialogHeader>
    </DialogContent>
  );
};

export default CredentialsDialog;
