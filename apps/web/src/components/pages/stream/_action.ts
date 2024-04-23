"use server";

import { db } from "@/server/db";
import { redirect } from "next/navigation";

export const startStream = async (form: FormData, key: string) => {
  const title = form.get("title") as string;
  const description = form.get("description") as string;

  const stream = await db.stream.update({
    where: { key },
    data: {
      live: true,
      title: title || "Untitled stream",
      description: description || "",
    },
  });

  redirect(`/stream/${stream.id}`);
};
