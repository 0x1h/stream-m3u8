import { VideoPlayer } from "@/components/pages/stream-id/video-player";
import { db } from "@/server/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const streamRecord = await db.stream.findUnique({
    where: { id: params.id },
    select: {
      user: { select: { name: true, image: true, id: true } },
      title: true,
      description: true,
    },
  });

  if(!streamRecord){
    redirect('/404')
  }

  return (
    <main className="mb-64">
      <VideoPlayer
        userId={streamRecord?.user.id ?? ""}
        name={streamRecord?.user.name ?? ""}
      />
      <div className="mt-4">
        <h1 className="break-all text-lg font-black md:text-2xl">
          {streamRecord?.title}
        </h1>
        <p className="break-all text-sm text-zinc-300">
          {streamRecord?.description}
        </p>
      </div>
      <div className="mt-4 flex items-center">
        <div className="relative">
          <Avatar className="size-11 items-center">
            <AvatarImage
              alt={`@${streamRecord?.user.name}`}
              src={streamRecord?.user.image as string}
            />
            <AvatarFallback className="uppercase">{streamRecord?.user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 left-1/2 z-20 -translate-x-1/2 select-none rounded-lg bg-red-950 px-1 text-center text-[10px] font-extrabold text-red-500 ">
            LIVE
          </div>
        </div>
        <div className="ml-2 text-xs text-zinc-400 md:text-sm">
          @{streamRecord?.user.name}
        </div>
      </div>
    </main>
  );
}

export default Page;
