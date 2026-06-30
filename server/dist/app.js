import { initSentry, Sentry } from "./sentry.js";
initSentry();
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import MongooseConnect from "./mongoose/index.js";
import { globalErrorHandler, notFoundHandler, } from "./errors/globalErrorHandler.js";
import tourRouter from "./routes/toursRouter.js";
import userRouter from "./routes/usersRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import subscribeRouter from "./routes/subscribeRoute.js";
import authRouter from "./routes/authRouter.js";
dotenv.config();
const app = express();
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL,
];
app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Welcome to the tourice server !!");
});
app.use("/api/v1/tour", tourRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/subscribe", subscribeRouter);
app.use("/api/v1/auth", authRouter);
app.use(notFoundHandler);
Sentry.setupExpressErrorHandler(app);
app.use(globalErrorHandler);
process.on("unhandledRejection", (reason) => {
    Sentry.captureException(reason);
    console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (error) => {
    Sentry.captureException(error);
    console.error("Uncaught Exception:", error);
    process.exit(1);
});
app.listen(process.env.PORT || 5000, () => {
    MongooseConnect();
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
export default app;
