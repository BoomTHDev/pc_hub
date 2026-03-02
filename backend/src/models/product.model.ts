import { prisma } from "../../lib/prisma";
import type { CreateProductInput } from "../types/product";

export const ProductModel = {
  getAll() {
    return prisma.product.findMany({
      where: { status: "ACTIVE" },
      select: {
        id: true,
        name: true,
        description: true,
        category: { select: { id: true, name: true } },
      },
    });
  },

  create(categoryId: number, data: CreateProductInput) {
    return prisma.product.create({
      data: {
        ...data,
        categoryId,
      },
    });
  },
};
