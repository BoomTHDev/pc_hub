import { AppError } from '../errors/AppError'
import { CategoryModel } from '../models/category.model'
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../types/category'

export const CategoryService = {
  async createCategory(payload: CreateCategoryInput) {
    const category = await CategoryModel.getByName(payload.name)
    if (category) {
      throw new AppError(403, `${payload.name} is already exists`)
    }
    return await CategoryModel.create(payload)
  },

  async findAll() {
    return await CategoryModel.getAll()
  },

  async findById(id: number) {
    const category = await CategoryModel.getById(id)
    if (!category) {
      throw new AppError(404, `Category ID ${id} not found`)
    }
    return category
  },

  async updateCategory(id: number, payload: UpdateCategoryInput) {
    const category = await CategoryModel.getById(id)
    if (!category) {
      throw new AppError(404, `Category ID ${id} not found`)
    }
    return CategoryModel.update(id, payload)
  },

  async deleteCategory(id: number) {
    const category = await CategoryModel.getById(id)
    if (!category) {
      throw new AppError(404, `Category ID ${id} not found`)
    }
    return await CategoryModel.hardDelete(id)
  },
}
