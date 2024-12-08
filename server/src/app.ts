import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import MongooseConnect from "./mongoose/index.js";

import tourRouter from "./routes/toursRouter.js";
import userRouter from "./routes/usersRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import subscribeRouter from "./routes/subscribeRoute.js";
import authRouter from "./routes/authRouter.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the tourice server !!");
});

app.use("/api/v1/tour", tourRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/subscribe", subscribeRouter);
app.use("/api/v1/auth", authRouter);

app.listen(process.env.PORT || 5000, () => {
  MongooseConnect();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

export default app;
