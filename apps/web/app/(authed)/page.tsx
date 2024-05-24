"use client";
import { trpc } from "@mrtrades/api/client";
import { NextPage } from "next";

interface Props {}

const HomePage: NextPage<Props> = ({}) => {
  const users = trpc.userList.useQuery();
  return (
    <div className="flex min-h-screen items-center justify-center gap-12 text-9xl">
      Bonjour!
    </div>
  );
};

export default HomePage;
