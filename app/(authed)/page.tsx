import LoginForm from "@/components/login-form";
import SignUpForm from "@/components/signup-form";
import { serverClient } from "@/trpc-client/server";

import { NextPage } from "next";

interface Props {}

const HomePage: NextPage<Props> = async ({}) => {
  return (
    <div className="flex min-h-screen items-center justify-center gap-12 text-9xl">
      Bonjour!
    </div>
  );
};

export default HomePage;
