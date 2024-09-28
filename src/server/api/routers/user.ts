import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {Category} from "src/app/_components/BudgetingCategorySelector";

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
	})
})