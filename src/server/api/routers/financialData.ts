import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { financialData } from "note/server/db/schema";

import type { db } from "note/server/db";
type dbType = typeof db;

export async function createForUser(db: dbType, input: { userId: string }) {
  await db.insert(financialData).values({
    userId: input.userId
  });
}

export const financialDataRouter = createTRPCRouter({
    createForUser: protectedProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await createForUser(ctx.db, input);
    }),
})