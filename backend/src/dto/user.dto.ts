import { z } from "zod";

// DTO สำหรับ Create User
export const CreateUserDto = z.object({
  firstName: z.string().min(1, "firstName must not be empty"),
  lastName: z.string().min(1, "lastName must not be empty"),
  email: z.string().email("email must be a valid email"),
  password: z.string().min(6, "password must be at least 6 characters"),
  phone: z.string().min(1, "phone must not be empty"),
});

// DTO สำหรับ Update User (ทุก field เป็น optional)
export const UpdateUserDto = z.object({
  firstName: z.string().min(1, "firstName must not be empty").optional(),
  lastName: z.string().min(1, "lastName must not be empty").optional(),
  email: z.string().email("email must be a valid email").optional(),
  password: z.string().min(6, "password must be at least 6 characters").optional(),
  phone: z.string().min(1, "phone must not be empty").optional(),
  position: z.enum(["CUSTOMER", "EMPLOYEE", "ADMIN"]).optional(),
});

// DTO สำหรับ params ที่มี id
export const IdParamDto = z.object({
  id: z.coerce
    .number("id must be a number")
    .int("id must be an integer")
    .positive("id must be a positive number"),
});

// สร้าง TypeScript Type อัตโนมัติ
export type CreateUserInput = z.infer<typeof CreateUserDto>;
export type UpdateUserInput = z.infer<typeof UpdateUserDto>;
export type IdParam = z.infer<typeof IdParamDto>;
