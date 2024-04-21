import { CredentialsAlert } from "@/components/pages/stream/credentials-alert";
import { StreamForm } from "@/components/pages/stream/stream-form";
import { StreamThumbnail } from "@/components/pages/stream/thumbnail";
import { Button } from "@/ui/button";
import { Rocket } from "lucide-react";

export default function StreamPage() {
  return (
    <main className="mt-12">
      <CredentialsAlert />
      <div className="flex flex-col gap-3 md:flex-row">
        <StreamThumbnail />
        <StreamForm />
      </div>
      <Button size="lg" className="mt-6 w-full uppercase gap-2">
        <Rocket size={15}/>
        <span>launch stream</span>
      </Button>
    </main>
  );
}
