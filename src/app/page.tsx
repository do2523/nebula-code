import Link from "next/link";

import { LatestPost } from "note/app/_components/post";
import { getServerAuthSession } from "note/server/auth";
import { api, HydrateClient } from "note/trpc/server";
import Homepage from "./_components/main_page";
import Navbar from "./_components/navbar";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <>
    <Navbar />
    <Homepage />
    </>
    
  );
}
