import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { financialData } from "note/server/db/schema";

export const financialDataRouter = createTRPCRouter({
    createForUser: protectedProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(financialData).values({
        userId: input.userId
      });
    }),
})