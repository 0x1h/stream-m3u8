import { CredentialsAlert } from "@/components/pages/stream/credentials-alert";
import { StreamForm } from "@/components/pages/stream/stream-form";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { TvIcon } from "@/icons/tv";
import { Button } from "@/ui/button";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import dynamic from "next/dynamic";
import { AlertDiamondIcon } from "@/icons/alert-diamond";
import Link from "next/link";
const AuthDialog = dynamic(() => import("@/components/shared/dialogs/auth"));

async function StreamPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center gap-3">
        <TvIcon className="size-20 md:size-28" />
        <p className="md:text-baase text-center text-sm">
          To start streaming, you must authorize first
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Authorize</Button>
          </DialogTrigger>
          <AuthDialog />
        </Dialog>
      </div>
    );
  }

  const getStream = await db.stream.findUnique({
    where: { key: session?.user.streamKey },
  });

  if (getStream) {
    return (
      <main className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
        <AlertDiamondIcon className="size-10 text-yellow-500" />
        <p className="text-yellow-500">You are already streaming</p>
        <Link href={`/stream/${getStream.id}`}>
          <Button variant={'secondary'}>Show me</Button>
        </Link>
        <p className="text-xs mt-12">
          If you turned off stream and you still see this error, reload page
        </p>
      </main>
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
