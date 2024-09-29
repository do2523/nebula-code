import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { financialData, userSpendingCategories } from "note/server/db/schema";
import { eq } from "drizzle-orm";
import {expenseType} from 'src/server/db/schema'
import { Category } from "note/app/_components/budgeting/BudgetingCategorySelector";
import { redirect } from 'next/navigation';

export const CategoryZod = z.object({
	id: z.string(),
	userId: z.string(),
	name: z.string(),
	categoryType: z.string(),
	value: z.number(),
  });
  export const convertToZodCategories = (categories: Category[]): CategoryZod[] => {
	return categories.map(category => {
		const newCategoryZod: CategoryZod = {
			id: category.id,
			userId: category.userId,
			name: category.name,
			categoryType: category.categoryType,
			value: category.value,
		};
		return newCategoryZod
	})
}
type CategoryZod = z.infer<typeof CategoryZod>;
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
		
		const categories = await ctx.db.query.userSpendingCategories.findMany({
            where: (category, { eq }) => eq(category?.userId, input),
        });
		return categories;
		return categories.map(category => {
			const category_type: Category = {
				id:category.id,
				name: category.categoryName,
				categoryType: category.categoryType,
				value: category.value,
				userId: category.userId,
			};
			return category_type;
		})
	}),

    updateSalary: protectedProcedure.input(z.object({userId: z.string(), salary: z.number()})).mutation(async ({ctx, input}) => {
        await ctx.db.update(financialData).set({ salary: input.salary }).where(eq(financialData.userId, input.userId));
    }),

    updateDebt: protectedProcedure.input(z.object({userId: z.string(), debt: z.number()})).mutation(async ({ctx, input}) => {
        await ctx.db.update(financialData).set({ debt: input.debt }).where(eq(financialData.userId, input.userId));
    }),

	updateCategories: protectedProcedure.input(CategoryZod.array()).mutation(async ({ctx,input}) => {
		const categories = input;

		for(const category of categories){
			const categoryExists = await ctx.db.query.userSpendingCategories.findFirst({
				where: (spendingCategory,{eq}) => eq(spendingCategory.id,category?.id),
			});
			if(!categoryExists){
				await ctx.db.insert(userSpendingCategories).values({
					id: category.id,
					userId: category.userId,
					categoryName: category.name,
					categoryType: category.categoryType,
					value: category.value,
				});
			}
			else{
				await ctx.db.update(userSpendingCategories).set({value: category.value}).where(eq(userSpendingCategories.id,category.id));
			}
		}
	}),
})