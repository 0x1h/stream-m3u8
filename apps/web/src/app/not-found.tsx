import { ErrorIcon } from "@/icons/error";
import { Button } from "@/ui/button";
import Link from "next/link";

const NotFound = () => (
  <main className="mt-12 flex flex-col items-center justify-center text-center">
    <ErrorIcon className="size-12 text-red-500" />
    <p className="text-red-500">This page was not found</p>
    <div className="text-sm">
      if you think is mistake contact us somewhere idk
      <Button asChild variant={"link"} className="px-2 text-sm">
        <Link href="https://github.com/xhxe/stream-m3u8/issues" target="_blank">
          Github issues
        </Link>
      </Button>
    </div>
  </main>
);

export default NotFound;
