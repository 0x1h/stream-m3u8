import { Button } from "@/ui/button";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import { Key } from "lucide-react";
import dynamic from "next/dynamic";
const CredentialsDialog = dynamic(
  () => import("@/components/shared/dialogs/credentials"),
);

export const CredentialsAlert = () => {
  return (
    <div className="mb-3 rounded-md border border-yellow-400 bg-yellow-400/10 p-3 text-yellow-400">
      <div className="flex items-center">
        <Key />
        <p className="ml-3 text-sm">
          Did you setup credentials in your streaming software?
        </p>
      </div>
      <div className="mt-3 flex gap-3">
        <Button
          size={"sm"}
          variant={"link"}
          className=" ml-auto text-yellow-400"
        >
          Yup
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size={"sm"}
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
