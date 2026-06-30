import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Sentry } from "../sentry.js";
import { AppError } from "./AppError.js";

export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    if (!err.isOperational) {
      Sentry.captureException(err);
    }
    res.status(err.statusCode).json({
      status: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      status: false,
      message: "Validation failed",
      errors: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  Sentry.captureException(err);

  const statusCode =
    "statusCode" in err ? (err as any).statusCode : 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;

  res.status(statusCode).json({
    status: false,
    message,
  });
}

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
}
