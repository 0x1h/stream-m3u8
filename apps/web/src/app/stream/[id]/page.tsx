import { db } from "@/server/db";

async function Page({ params }: { params: { id: string } }) {
  const streamRecord = await db.stream.findUnique({ where: { id: params.id } });

  return <main></main>;
}

export default Page;
