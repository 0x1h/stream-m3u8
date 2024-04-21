import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/ui/button";
import dynamic from "next/dynamic";
const AuthDialog = dynamic(() => import("@/components/shared/dialogs/auth"));
import { Dialog, DialogTrigger } from "@/ui/dialog";
import { Ghost } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main>
      <div className="mt-12 flex flex-col items-center justify-center gap-3">
        <Ghost size={130} />
        <p>Seems like no one is streaming yet, be first and stream</p>
        {session?.user ? (
          <Link href="/stream">
            <Button>Start Streaming</Button>
          </Link>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Authorize</Button>
            </DialogTrigger>
            <AuthDialog />
          </Dialog>
        )}
      </div>
    </main>
  );
}
