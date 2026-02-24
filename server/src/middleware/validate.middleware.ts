import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError } from "zod";

export const validate = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next(); // IMPORTANT
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: err.issues[0]?.message || "Validation error",
        });
      }

      return next(err); // IMPORTANT
    }
  };
};
