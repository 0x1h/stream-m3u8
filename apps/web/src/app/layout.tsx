import "@stream-m3u8/ui/globals.css";
import { GeistMono } from "geist/font/mono";

import { Navbar } from "@/components/shared/navbar";
import { Providers } from "@/components/shared/providers";
import { Popups } from "@/components/shared/popups";
import { Progressbar } from "@/components/shared/progressbar";

export const metadata = {
  title: "stream-m3u8",
  description:
    "streaming service using third-party applications obs, streamlabs...",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>
        <Progressbar />
        <Providers>
          <Navbar />
          <div className="container">{children}</div>
          <Popups />
        </Providers>
      </body>
    </html>
  );
}
