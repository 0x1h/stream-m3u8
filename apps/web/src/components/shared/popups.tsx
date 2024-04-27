"use client";
import { CookieIcon } from "@/icons/cookie";
import { XIcon } from "@/icons/x";
import { Button } from "@/ui/button";
import { useEffect, useState } from "react";

export const Popups = () => {
  const [accept, setAccept] = useState(true);

  useEffect(() => {
    const cookieStorage = localStorage.getItem("accept-cookie");

    if (!cookieStorage) {
      setAccept(false);
    }
  }, []);

  const acceptCookies = () => {
    setAccept(true);
    localStorage.setItem("accept-cookie", "true");
  };

  if (accept) return;

  return (
    <div className="container fixed bottom-5 left-1/2 flex w-full -translate-x-1/2 flex-col items-baseline gap-x-3 rounded-lg border px-2 py-3 md:flex-row md:items-center">
      <CookieIcon className="flex-none" />
      <p className="left-0 mt-3 text-xs md:mt-0">
        We use cookies to enhance your experience on our website. By continuing
        to use this site, you consent to our use of cookies. For more details,
        please see our Cookie Policy.
      </p>
      <Button
        onClick={acceptCookies}
        size={"icon"}
        variant={"ghost"}
        className="absolute right-2 h-6 w-6"
      >
        <XIcon className="size-4" />
      </Button>
    </div>
  );
};
