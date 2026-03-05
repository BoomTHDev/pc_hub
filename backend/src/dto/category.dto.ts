import { z } from "zod";

// DTO สำหรับ Create Category
export const CreateCategoryDto = z.object({
  name: z.string().min(1, "name must not be empty"),
  description: z.string().min(1, "description must not be empty").optional(),
});

// DTO สำหรับ Update Category (ทุก field เป็น optional)
export const UpdateCategoryDto = z.object({
  name: z.string().min(1, "name must not be empty").optional(),
  description: z.string().optional(),
});

// DTO สำหรับ params ที่มี id
export const IdParamDto = z.object({
  id: z.coerce
    .number("id must be a number")
    .int("id must be an integer")
    .positive("id must be a positive number"),
});

// สร้าง TypeScript Type อัตโนมัติ
export type CreateCategoryInput = z.infer<typeof CreateCategoryDto>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategoryDto>;
export type IdParam = z.infer<typeof IdParamDto>;
