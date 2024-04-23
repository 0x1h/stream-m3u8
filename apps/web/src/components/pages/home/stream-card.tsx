"use client";
import { useHls } from "@/hooks/useHls";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import Link from "next/link";

export type StreamCardProps = {
  id: string;
  title: string;
  user: { name: string; image: string };
};

export const StreamCard = ({ title, user, id }: StreamCardProps) => {
  const [ref] = useHls(user.name);

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-sm shadow-black transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <Link className="block" href={`/stream/${id}`}>
        <video
          className="object-cover transition-all duration-300 group-hover:scale-[1.05]"
          ref={ref}
        />
      </Link>
      <div className="flex items-center gap-3 py-3">
        <Avatar>
          <AvatarImage alt={`@${user.name}`} src={user.image as string} />
          <AvatarFallback className="uppercase">
            {user.name?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="line-clamp-1 text-sm font-semibold">
            <Link href={`/stream/${id}`}>{title}</Link>
          </h3>
          <div className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
            @{user.name}
          </div>
        </div>
      </div>
    </div>
  );
};
