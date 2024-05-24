import { User } from '@prisma/client';
import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import "server-only";
import db from '@mrtrades/prisma';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import lucia from '@mrtrades/lucia'

const createContext = async (req: Request) => {
  const cookies = req.headers.get("Cookie")
  const authorization = req.headers.get("authorization")

  if (!cookies && !authorization) return { user: null };

  let sessionId = null;
  if (cookies) sessionId = lucia.readSessionCookie(cookies)
  if (authorization) sessionId = lucia.readBearerToken(authorization);

  if (!sessionId) return { user: null };

  const info = await lucia.validateSession(sessionId)
  return info.user;
};

const t = initTRPC.context<typeof createContext>().create({
  transformer: SuperJSON,
});

const createCallerFactory = t.createCallerFactory;
const router = t.router;
const publicProcedure = t.procedure;

export const appRouter = router({
  userList: publicProcedure
    .query(async ({ ctx }) => {
      const users: User[] = await db.user.findMany();
      return users;
    }),
});

export type AppRouter = typeof appRouter;

export const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async ({ req }) => await createContext(req),
  });

