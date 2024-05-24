import LoginForm from "@/components/login-form";
import SignUpForm from "@/components/signup-form";
import { NextPage } from "next";

interface Props {}

const HomePage: NextPage<Props> = async ({}) => {
  return (
    <div className="flex min-h-screen items-center justify-center gap-12">
      <LoginForm />
      <SignUpForm />
    </div>
  );
};

export default HomePage;
