import lucia from "@mrtrades/lucia";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return redirect("/connecter");
  const { user, session } = await lucia.validateSession(sessionId);
  if (!user) return redirect("/connecter");

  return (
    <>
      url:{process.env.WEB_APP_URL}
      {children}
    </>
  );
}
