import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import MongooseConnect from "./mongoose/index.js";

import tourRouter from "./routes/toursRouter.js";
import bookingRouter from "./routes/bookingRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the tourice server !!");
});

app.use("/api/v1/tour", tourRouter);
app.use("api/v1/booking", bookingRouter);

app.listen(process.env.PORT || 5000, () => {
  MongooseConnect();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

export default app;
