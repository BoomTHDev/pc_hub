import { z } from "zod";

// DTO สำหรับ Create Product
export const CreateProductDto = z.object({
  name: z.string().min(1, "name must not be empty"),
  description: z.string().min(1, "description must not be empty"),
  price: z.number().positive("price must be a positive number"),
  stockQuantity: z
    .number()
    .int("stockQuantity must be an integer")
    .min(0, "stockQuantity must be at least 0")
    .optional()
    .default(0),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  categoryId: z.coerce
    .number("categoryId must be a number")
    .int("categoryId must be an integer")
    .positive("categoryId must be a positive number"),
});

// DTO สำหรับ Update Product (ทุก field เป็น optional)
export const UpdateProductDto = z.object({
  name: z.string().min(1, "name must not be empty").optional(),
  description: z.string().min(1, "description must not be empty").optional(),
  price: z.number().positive("price must be a positive number").optional(),
  stockQuantity: z
    .number()
    .int("stockQuantity must be an integer")
    .min(0, "stockQuantity must be at least 0")
    .optional(),
  categoryId: z.coerce
    .number("categoryId must be a number")
    .int("categoryId must be an integer")
    .positive("categoryId must be a positive number")
    .optional(),
});

// DTO สำหรับ params ที่มี id
export const IdParamDto = z.object({
  id: z.coerce
    .number("id must be a number")
    .int("id must be an integer")
    .positive("id must be a positive number"),
});

// สร้าง TypeScript Type อัตโนมัติ
export type CreateProductInput = z.infer<typeof CreateProductDto>;
export type UpdateProductInput = z.infer<typeof UpdateProductDto>;
export type IdParam = z.infer<typeof IdParamDto>;
