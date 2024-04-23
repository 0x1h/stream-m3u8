import { CredentialsAlert } from "@/components/pages/stream/credentials-alert";
import { StreamForm } from "@/components/pages/stream/stream-form";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/ui/button";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import { Tv } from "lucide-react";
import dynamic from "next/dynamic";
const AuthDialog = dynamic(() => import("@/components/shared/dialogs/auth"));

async function StreamPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center gap-3">
        <Tv size={130} />
        <p>To start streaming, you must authorize first</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Authorize</Button>
          </DialogTrigger>
          <AuthDialog />
        </Dialog>
      </div>
    );
  }

  return (
    <main className="mt-12">
      <CredentialsAlert />
      <StreamForm session={session} />
    </main>
  );
}

export default StreamPage;
