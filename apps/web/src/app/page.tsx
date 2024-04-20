import { api } from "@/trpc/server";

export default async function Home() {
  const hello = await api.test({ id: "sad" });

  return <main>api: {hello.msg}</main>;
}
