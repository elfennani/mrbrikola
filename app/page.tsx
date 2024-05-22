import LoginForm from "@/components/login-form";
import { serverClient } from "@/trpc-client/server";

import { NextPage } from "next";

interface Props {}

const HomePage: NextPage<Props> = async ({}) => {
  const users = await serverClient.userList();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
      {users.length}
    </div>
  );
};

export default HomePage;
