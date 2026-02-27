import { prisma } from '../../lib/prisma'
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../types/category'

export const CategoryModel = {
  create(data: CreateCategoryInput) {
    return prisma.category.create({ data })
  },

  getAll() {
    return prisma.category.findMany()
  },

  getById(id: number) {
    return prisma.category.findFirst({
      where: { id },
    })
  },

  getByName(name: string) {
    return prisma.category.findFirst({
      where: { name },
    })
  },

  update(id: number, data: UpdateCategoryInput) {
    return prisma.category.update({
      where: { id },
      data,
    })
  },

  hardDelete(id: number) {
    return prisma.category.delete({
      where: { id },
    })
  },

  softDelete() {},
}
