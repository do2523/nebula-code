import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { financialData, userSpendingCategories } from "note/server/db/schema";
import { eq } from "drizzle-orm";
import type { Category } from "note/app/_components/budgeting/BudgetingCategorySelector";
import { DefaultCategories } from "note/app/_components/dashboard/defaultCategories";
import { TRPCError } from "@trpc/server";
import type { db } from "note/server/db";
import { createForUser } from "./financialData";
type dbType = typeof db;

export const CategoryZod = z.object({
	id: z.string(),
	userId: z.string(),
	name: z.string(),
	type: z.string(),
	value: z.number(),
  });
  export const convertToZodCategories = (categories: Category[]): CategoryZod[] => {
	return categories.map(category => {
		const newCategoryZod: CategoryZod = {
			id: category.id,
			userId: category.userId,
			name: category.name,
			type: category.type,
			value: category.value,
		};
		return newCategoryZod;
	})
}

type CategoryZod = z.infer<typeof CategoryZod>;

async function updateCategories(db: dbType, input: Category[]) {
	const categories = input;

	for(const category of categories){
		console.log(category);
		const categoryExists = await db.query.userSpendingCategories.findFirst({
			where: (spendingCategory,{eq}) => eq(spendingCategory.id,category?.id),
		});
		//console.log(categoryExists);
		if(!categoryExists){
			await db.insert(userSpendingCategories).values({
				id: category.id,
				userId: category.userId,
				categoryName: category.name,
				categoryType: category.type,
				value: category.value,
			});
		}
		else{
			console.log("updating");
			await db.update(userSpendingCategories).set({value: category.value}).where(eq(userSpendingCategories.id,category.id));
		}
	}
}

export const userRouter = createTRPCRouter({
    getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        return await ctx.db.query.users.findFirst({
            where: (user, { eq }) => eq(user?.id, input),
            with: {
                financialData: true
            },
        })
    }),
	getCategoriesOfUser: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		let categories = await ctx.db.query.userSpendingCategories.findMany({
            where: (category, { eq }) => eq(category.userId, input),
        });

		// userSpendingCategories table doesn't exist in db
		if(categories.length == 0) {
			// create userSpendingCategories with default categories
			const defaultCategories = DefaultCategories.map(defaultCategory => {
				return {
					id: crypto.randomUUID(),
					userId: input,
					name: defaultCategory.name,
					type: defaultCategory.type,
					value: 0,
				};
			});
			
			await updateCategories(ctx.db, defaultCategories); 

			categories = await ctx.db.query.userSpendingCategories.findMany({
				where: (category, { eq }) => eq(category.userId, input),
			});

			// userSpendingCategories table couldn't be created
			if(categories.length == 0) {
				throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Could not create userSpendingCategories table for user' });
			}
		}

		const formattedCategories = categories.map(category => {
			return {
				id: category.id,
				userId: category.userId,
				name: category.categoryName,
				type: category.categoryType,
				value: category.value,
			};
		});

		return formattedCategories;
	}),
	// input should be a user's id
	getFinancialData: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		let data = await ctx.db.query.financialData.findFirst({
			where: (data, { eq }) => eq(data.userId, input),
		});

		// financialData table doesn't exist in db
		if(!data) {
			// try to create financialData table
			await createForUser(ctx.db, { userId: input });

			data = await ctx.db.query.financialData.findFirst({
				where: (data, { eq }) => eq(data.userId, input),
			});

			// financialData table couldn't be created
			if(!data) {
				throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Could not create financialData table for user' });
			}
		}

		return data;
	}),
    updateSalary: protectedProcedure.input(z.object({userId: z.string(), salary: z.number()})).mutation(async ({ctx, input}) => {
        await ctx.db.update(financialData).set({ salary: input.salary }).where(eq(financialData.userId, input.userId));
    }),

    updateDebt: protectedProcedure.input(z.object({userId: z.string(), debt: z.number()})).mutation(async ({ctx, input}) => {
        await ctx.db.update(financialData).set({ debt: input.debt }).where(eq(financialData.userId, input.userId));
    }),

	updateCategories: protectedProcedure.input(CategoryZod.array()).mutation(async ({ctx,input}) => {
		return updateCategories(ctx.db, input);
	}),
})