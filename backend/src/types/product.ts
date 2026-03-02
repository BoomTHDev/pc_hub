import type { ProductStatus } from "../../generated/prisma/enums";

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  status: ProductStatus;
}
