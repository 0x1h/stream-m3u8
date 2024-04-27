"use client";
import { KeyIcon } from "@/icons/key";
import { Button } from "@/ui/button";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const CredentialsDialog = dynamic(
  () => import("@/components/shared/dialogs/credentials"),
);

export const CredentialsAlert = () => {
  const [accept, setAccept] = useState(true);

  useEffect(() => {
    const credentialsStorage = localStorage.getItem("credentials-install");

    if (!credentialsStorage) {
      setAccept(false);
    }
  }, []);

  const acceptWarn = () => {
    setAccept(true);
    localStorage.setItem("credentials-install", "true");
  };

  if (accept) return;

  return (
    <div className="mb-3 rounded-md border border-yellow-400 bg-yellow-400/10 p-3 text-yellow-400">
      <div className="flex items-center">
        <KeyIcon className="text-yellow-400" />
        <p className="ml-3 text-sm">
          Did you setup credentials in your streaming software?
        </p>
      </div>
      <div className="mt-3 flex gap-3">
        <Button
          size="sm"
          variant="link"
          onClick={acceptWarn}
          className="ml-auto text-yellow-400"
        >
          Yup
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-yellow-400 text-black hover:bg-yellow-500"
            >
              What credentials?
            </Button>
          </DialogTrigger>
          <CredentialsDialog />
        </Dialog>
      </div>
    </div>
  );
};
