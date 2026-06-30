import { ZodError } from "zod";
import { Sentry } from "../sentry.js";
import { AppError } from "./AppError.js";
export function globalErrorHandler(err, _req, res, _next) {
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
    const statusCode = "statusCode" in err ? err.statusCode : 500;
    const message = process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message;
    res.status(statusCode).json({
        status: false,
        message,
    });
}
export function notFoundHandler(req, _res, next) {
    next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
}
