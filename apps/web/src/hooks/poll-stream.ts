import { socket } from "@/utils/io";
import { useEffect, useState } from "react";
import { useLaunchable } from "./launchable";

export const usePollStream = (key: string) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [streamingStarted, setStreamingStarted] = useState("");
  const { setLaunchbale } = useLaunchable();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (!isConnected) return;

    if (!streamingStarted) socket.emit("stream", key);

    const receivePollStream = (username: string) => {
      setStreamingStarted(username);
      if (username !== "[ENDED]" && username) {
        setLaunchbale(false);
      } else {
        setLaunchbale(true);
      }
    };

    const closePollStream = () => {
      setStreamingStarted("");
    };

    socket.on(`stream:${key}`, receivePollStream);

    return () => {
      socket.off(`stream:${key}`, receivePollStream);
      closePollStream();
    };
  }, [isConnected]);

  return {
    isConnected,
    streamingStarted,
  };
};
