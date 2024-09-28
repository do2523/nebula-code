import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import {Category} from "src/app/_components/BudgetingCategorySelector";
import { financialData } from "note/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
    getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        return await ctx.db.query.users.findFirst({
            where: (user, { eq }) => eq(user?.id, input),
            with: {
                financialData: true
            },
        })
    }),
	getCategoriesOfUser: publicProcedure.input(z.string()).query(async ({ctx,input}) => {
		const categories = await ctx.db.query.userSpendingCategories.findFirst({
            where: (category, { eq }) => eq(category?.userId, input),
        });

		return categories;
	}),

    updateSalary: protectedProcedure.input(z.object({userId: z.string(), salary: z.number()})).mutation(async ({ctx, input}) => {
        await ctx.db.update(financialData).set({ salary: input.salary }).where(eq(financialData.userId, input.userId));
    }),

    updateDebt: protectedProcedure.input(z.object({userId: z.string(), debt: z.number()})).mutation(async ({ctx, input}) => {
        await ctx.db.update(financialData).set({ debt: input.debt }).where(eq(financialData.userId, input.userId));
    }),
})