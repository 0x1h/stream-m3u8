"use client";
import { Label } from "@/ui/label";
import { Tv } from "lucide-react";

export const StreamThumbnail = () => {
  return (
    <div className="w-full">
      <Label className="uppercase">preview</Label>
      <div className="relative flex aspect-video flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border object-cover p-3">
        <Tv className="size-12 text-secondary md:size-24" />
        <p className="mt-1 select-none text-center text-xs text-white/50 md:mt-3 md:text-sm">
          A preview will be displayed once streaming software and the server
          have successfully connected
        </p>
      </div>
    </div>
  );
};
