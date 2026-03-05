import { prisma } from "../../lib/prisma";
import type { CreateProductInput, UpdateProductInput } from "../dto/product.dto";

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

  create(data: CreateProductInput) {
    return prisma.product.create({
      data,
      select: {
        id: true,
        name: true,
        description: true,
        category: { select: { id: true, name: true } },
      },
    });
  },

  update(id: number, data: UpdateProductInput) {
    return prisma.product.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        category: { select: { id: true, name: true } },
      },
    });
  },
};
