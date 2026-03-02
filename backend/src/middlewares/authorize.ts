import type { NextFunction, Request, Response } from "express";
import type { UserPosition } from "../../generated/prisma/enums";
import { AppError } from "../errors/AppError";

export function authorize(...roles: UserPosition[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.position)) {
      throw new AppError(403, "Forbidden");
    }
    next();
  };
}
