"use client";
import { Label } from "@/ui/label";
import { Tv } from "lucide-react";
import Hls from "hls.js";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { usePollStream } from "@/hooks/poll-stream";

type StreamThumbnailProps = {
  userId: string;
};

export const StreamThumbnail = ({ userId }: StreamThumbnailProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data: session } = useSession();
  const { streamingStarted } = usePollStream(userId);

  useEffect(() => {
    if (!session?.user?.name && !streamingStarted) return;

    const videoSrc = `http://localhost:8080/hls/${session?.user.name}.m3u8`;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      if (videoRef.current) {
        hls.attachMedia(videoRef.current);
      } else {
        if (videoRef.current) {
          if (
            (videoRef.current as HTMLVideoElement).canPlayType(
              "application/vnd.apple.mpegurl",
            )
          ) {
            (videoRef.current as HTMLVideoElement).src = videoSrc;
          }
        }
      }
    }
  }, [session, streamingStarted]);

  return (
    <div className="w-full">
      <Label className="uppercase">preview</Label>
      <div
        className={cn(
          "relative flex aspect-video flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border object-cover p-3",
          streamingStarted && "aspect-auto",
        )}
      >
        {!streamingStarted ? (
          <>
            <Tv className="size-12 text-secondary md:size-24" />
            <p className="mt-1 select-none text-center text-xs text-white/50 md:mt-3 md:text-sm">
              A preview will be displayed once streaming software and the server
              have successfully connected
            </p>
          </>
        ) : (
          <video ref={videoRef} autoPlay muted />
        )}
      </div>
    </div>
  );
};
