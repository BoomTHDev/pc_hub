import { AppError } from "../errors/AppError";
import { UserModel } from "../models/user.model";
import type { CreateUserInput, LoginUserInput } from "../types/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

export const AuthService = {
  async register(payload: CreateUserInput) {
    // Check user by email
    const exitingUser = await UserModel.getByEmail(payload.email);
    if (exitingUser) {
      throw new AppError(403, "Email is already exists");
    }

    // Check user by phone
    const hasPhoneExits = await UserModel.getByPhone(payload.phone);
    if (hasPhoneExits) {
      throw new AppError(403, "Phone is already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    // Prepare data
    const userData: CreateUserInput = {
      ...payload,
      password: hashedPassword,
    };

    // Create new user
    return await UserModel.create(userData);
  },

  async login(payload: LoginUserInput) {
    // Find user existing by email
    const existingUser = await UserModel.getByEmail(payload.email);
    if (!existingUser) {
      throw new AppError(404, "User not found");
    }

    // Check password
    const isMatch = await bcrypt.compare(
      payload.password,
      existingUser.password,
    );
    if (!isMatch) {
      throw new AppError(400, "Password is wrong");
    }

    // Generate JWT Token
    const token = jwt.sign(
      // Payload
      { sub: existingUser.id, position: existingUser.position },
      // Secret key
      JWT_SECRET_KEY,
      // Expire Date
      { expiresIn: "1H" },
    );

    return token;
  },
};
