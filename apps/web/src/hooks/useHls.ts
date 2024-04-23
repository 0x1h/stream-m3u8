import Hls from "hls.js";
import { useEffect, useRef } from "react";

export const useHls = (name: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoSrc = `http://localhost:8080/hls/${name}.m3u8`;

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
  }, []);

  return [videoRef];
};
