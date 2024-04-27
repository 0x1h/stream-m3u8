"use client";
import { usePollStream } from "@/hooks/poll-stream";
import { useHls } from "@/hooks/useHls";
import { VideoOffIcon } from "@/icons/video-off";
import { Button } from "@/ui/button";
import Link from "next/link";

type VideoPlayerProps = {
  userId: string;
  name: string;
};

export const VideoPlayer = ({ name, userId }: VideoPlayerProps) => {
  const [ref] = useHls(name);
  const { streamingStarted } = usePollStream(userId);

  return (
    <div className="mt-3">
      {streamingStarted === "[ENDED]" ? (
        <div className="flex aspect-video flex-col items-center justify-center rounded-xl border border-primary bg-primary/5 p-3">
          <VideoOffIcon className="size-14 text-primary sm:size-20 md:size-36" />
          <p className="text-center text-xs sm:text-sm md:text-base">
            Seems like streamer turned off stream
          </p>
          <Link href="/">
            <Button size="sm" className="mt-3">
              Go back
            </Button>
          </Link>
        </div>
      ) : (
        <video
          ref={ref}
          muted
          autoPlay
          className=" rounded-md lg:w-[calc(100%-100px)]"
        />
      )}
    </div>
  );
};
