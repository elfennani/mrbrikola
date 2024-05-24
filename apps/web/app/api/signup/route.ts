import "server-only";
import db from "@mrtrades/prisma";
import { cookies } from "next/headers";
import { scrypt } from "crypto";
import schema from "@/lib/zod/signup";
import lucia from "@mrtrades/lucia";

export async function POST(request: Request) {
  const input = await request.json();
  await new Promise(res => setTimeout(res, 150));
  const { error, data } = schema.safeParse(input);

  if (error) {
    return Response.json({
      error: error.message,
    });
  }

  const { password, email, firstName, lastName, nationalId } = data;

  const existingUser = await db.user.findFirst({ where: { email, password } });
  if (existingUser) {
    return Response.json({
      error: "Email already exists"
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

  const user = await db.user.create({
    data: {
      password: passwordHash,
      first_name: firstName,
      last_name: lastName,
      id_national: nationalId,
      email
    },
    select: { id: true }
  })

  const session = await lucia.createSession(user.id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return Response.json({
    session,
    error: undefined
  })
}