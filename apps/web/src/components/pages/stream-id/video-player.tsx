import { useHls } from "@/hooks/useHls";

type VideoPlayerProps = {
  name: string;
};

export const VideoPlayer = ({ name }: VideoPlayerProps) => {
  const [ref] = useHls(name);

  return (
    <div>
      <video ref={ref} />
    </div>
  );
};
