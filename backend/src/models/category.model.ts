import { prisma } from "../../lib/prisma";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dto/category.dto";

export const CategoryModel = {
  create(data: CreateCategoryInput) {
    return prisma.category.create({
      data,
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
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
      include: {
        products: {
          select: { id: true, name: true },
        },
      },
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
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
  },

  hardDelete(id: number) {
    return prisma.category.delete({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  },

  softDelete(id: number) {
    return prisma.category.update({
      where: { id },
      data: { status: "INACTIVE" },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
  },

  restore(id: number) {
    return prisma.category.update({
      where: { id },
      data: { status: "ACTIVE" },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
  },
};
