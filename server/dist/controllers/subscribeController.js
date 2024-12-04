import Subscribe from "../models/Subscribe.js";
import z from "zod";
export const createSubscribers = async (req, res) => {
    try {
        const subscriber = z.object({ email: z.string() }).parse(req.body);
        const newSubscriber = new Subscribe(subscriber);
        const savedUser = await newSubscriber.save();
        res.status(200).json({
            status: true,
            data: savedUser,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error,
        });
    }
};
