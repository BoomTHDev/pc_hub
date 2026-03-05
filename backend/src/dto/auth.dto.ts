import { z } from "zod";

// DTO สำหรับ Register (Signup)
export const RegisterDto = z.object({
  firstName: z.string().min(1, "firstName must not be empty"),
  lastName: z.string().min(1, "lastName must not be empty"),
  email: z.string().email("email must be a valid email"),
  password: z.string().min(6, "password must be at least 6 characters"),
  phone: z.string().min(1, "phone must not be empty"),
});

// DTO สำหรับ Login (Signin)
export const LoginDto = z.object({
  email: z.string().email("email must be a valid email"),
  password: z.string().min(1, "password must not be empty"),
});

// สร้าง TypeScript Type อัตโนมัติ
export type RegisterInput = z.infer<typeof RegisterDto>;
export type LoginInput = z.infer<typeof LoginDto>;
