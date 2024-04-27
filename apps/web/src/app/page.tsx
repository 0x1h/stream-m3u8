import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/ui/button";
import dynamic from "next/dynamic";
const AuthDialog = dynamic(() => import("@/components/shared/dialogs/auth"));
import { Dialog, DialogTrigger } from "@/ui/dialog";
import Link from "next/link";
import { db } from "@/server/db";
import {
  StreamCard,
  StreamCardProps,
} from "@/components/pages/home/stream-card";
import { VideoOffIcon } from "@/icons/video-off";

export default async function Home() {
  const session = await getServerAuthSession();
  const streams = await db.stream.findMany({
    select: {
      id: true,
      title: true,
      user: { select: { name: true, image: true } },
    },
    where: { live: true },
  });

  return (
    <main>
      {streams.length > 0 ? (
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {streams.map((stream) => (
            <StreamCard key={stream.id} {...(stream as StreamCardProps)} />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center gap-3">
          <VideoOffIcon className="size-20 text-zinc-300" />

          <p className="text-center">Seems like no one is streaming yet, be first and stream</p>
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
      )}
    </main>
  );
}
