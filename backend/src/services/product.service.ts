import { AppError } from "../errors/AppError";
import { ProductModel } from "../models/product.model";
import type { CreateProductInput, UpdateProductInput } from "../dto/product.dto";

export const ProductService = {
  async findAll() {
    return await ProductModel.getAll();
  },

  async createProduct(payload: CreateProductInput) {
    return await ProductModel.create(payload);
  },

  async updateProduct(id: number, payload: UpdateProductInput) {
    const product = await ProductModel.getById(id);
    if (!product) {
      throw new AppError(404, `Product ID ${id} not found`);
    }

    return await ProductModel.update(id, payload);
  },

  async softDeleteProduct(id: number) {
    const product = await ProductModel.getById(id);
    if (!product) {
      throw new AppError(404, `Product ID ${id} not found`);
    }

    if (product.status !== "ACTIVE") {
      throw new AppError(400, "Product is inactive now (no change)");
    }

    return await ProductModel.softDelete(id);
  },
};
