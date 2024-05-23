import "server-only";
import db from '@/prisma/db';
import { router, publicProcedure } from './index';
import { z } from 'zod';
import { User } from "@prisma/client";

export const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users: User[] = await db.user.findMany();
      return users;
    }),
});

export type AppRouter = typeof appRouter;