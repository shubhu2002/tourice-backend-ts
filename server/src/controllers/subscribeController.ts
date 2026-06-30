import type { Request, Response } from "express";
import Subscribe from "../models/Subscribe.js";
import z from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createSubscribers = asyncHandler(
  async (req: Request, res: Response) => {
    const subscriber = z.object({ email: z.string() }).parse(req.body);
    const newSubscriber = new Subscribe(subscriber);
    const savedUser = await newSubscriber.save();

    res.status(200).json({
      status: true,
      data: savedUser as { email: string },
    });
  },
);
