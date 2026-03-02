import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/user";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

export function anthenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, "Unauthorized");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new AppError(401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError(401, "Unauthorized");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    console.log(payload);
    next();
  } catch (error) {
    throw new AppError(401, "Invalid or expired token");
  }
}
