import { prisma } from "../../lib/prisma";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dto/category.dto";

export const CategoryModel = {
  create(data: CreateCategoryInput) {
    return prisma.category.create({ data });
  },

  getAll() {
    return prisma.category.findMany({
      where: { status: "ACTIVE" },
      include: {
        products: {
          select: { id: true, name: true },
        },
      },
    });
  },

  getById(id: number) {
    return prisma.category.findFirst({
      where: { id },
    });
  },

  getByName(name: string) {
    return prisma.category.findFirst({
      where: { name, status: "ACTIVE" },
    });
  },

  update(id: number, data: UpdateCategoryInput) {
    return prisma.category.update({
      where: { id },
      data,
    });
  },

  hardDelete(id: number) {
    return prisma.category.delete({
      where: { id },
    });
  },

  softDelete(id: number) {
    return prisma.category.update({
      where: { id },
      data: { status: "INACTIVE" },
    });
  },

  restore(id: number) {
    return prisma.category.update({
      where: { id },
      data: { status: "ACTIVE" },
    });
  },
};
