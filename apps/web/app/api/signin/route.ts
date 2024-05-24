import db from "@mrtrades/prisma";
import { cookies } from "next/headers";
import { z } from "zod";
import "server-only"
import { scrypt } from "crypto";
import lucia from '@mrtrades/lucia'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export async function POST(request: Request) {
  const { email, password } = await request.json();
  await new Promise(res => setTimeout(res, 150));
  const { error } = schema.safeParse({ email, password });

  if (error) {
    return Response.json({
      error: error.message,
    });
  }

  const passwordHash = await new Promise<string>((resolve, reject) => {
    scrypt(password, "trsdk", 32, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash.toString("hex"));
      }
    });
  });

  const existingUser = await db.user.findFirst({ where: { email, password: passwordHash } });
  if (!existingUser) {
    return Response.json({
      error: "Incorrect username or password"
    });
  }

  const session = await lucia.createSession(existingUser.id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return Response.json({
    session,
    error: undefined
  })
}