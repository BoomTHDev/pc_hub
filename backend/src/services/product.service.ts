import { ProductModel } from "../models/product.model";
import type { CreateProductInput } from "../dto/product.dto";

export const ProductService = {
  async findAll() {
    return await ProductModel.getAll();
  },

  async createProduct(payload: CreateProductInput) {
    return await ProductModel.create(payload);
  },
};
