import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validate(
  schema: z.ZodObject<any>,
  source: "body" | "params" | "query" = "body",
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = z.safeParse(schema, req[source]);

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => {
        return {
          field: issue.path.join("."),
          message: issue.message,
        };
      });

      res.status(400).json({
        error: "Validation Error",
        details: errorMessages,
      });

      return;
    }

    req[source] = result.data;
    next();
  };
}
