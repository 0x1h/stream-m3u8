"use client";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Label } from "@/ui/label";
import { StreamThumbnail } from "./thumbnail";
import { Button } from "@/ui/button";
import { Loader2, Rocket } from "lucide-react";
import { Session } from "next-auth";
import { useLaunchable } from "@/hooks/laucnhable";
import { startStream } from "./_action";
import { useState } from "react";

export const StreamForm = ({ session }: { session: Session }) => {
  const { launchable } = useLaunchable();
  const [loading, setLoading] = useState(false);

  return (
    <form
      action={async (form) => {
        await startStream(form, session.user.streamKey);
        setLoading(true);
      }}
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <StreamThumbnail userId={session.user.id} />
        <div className="w-full space-y-4">
          <div>
            <Label className="uppercase">title</Label>
            <Input placeholder="Title" name="title" />
          </div>
          <div>
            <Label className="uppercase">description</Label>
            <Textarea
              placeholder="Description"
              className="h-36 resize-none"
              name="description"
            />
          </div>
        </div>
      </div>
      <Button
        size="lg"
        className="mt-6 w-full gap-2 uppercase"
        disabled={loading || launchable}
      >
        {!loading ? (
          <>
            <Rocket size={15} />
            <span>launch stream</span>
          </>
        ) : (
          <>
            <Loader2 size={15} className="animate-spin"/>
            <span>starting</span>
          </>
        )}
      </Button>
    </form>
  );
};
