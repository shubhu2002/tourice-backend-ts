import z from "zod";
import Tour from "../models/Tours.js";
export const getAllTour = async (req, res) => {
    try {
        const tours = await Tour.find();
        if (!tours) {
            res.status(404).json({ success: true, message: "No data found" });
            return;
        }
        res.status(200).json({
            success: true,
            data: tours,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};
export const getTourByTitle = async (req, res) => {
    try {
        const { title } = z.object({ title: z.string() }).parse(req.params);
        if (!title) {
            res.status(404).json("No title Found");
            return;
        }
        const tours = await Tour.find({ title });
        if (!tours) {
            res.status(404).json({ success: true, message: "No data found" });
            return;
        }
        res.status(200).json({
            success: true,
            data: tours,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};
export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true });
        res.status(200).json({
            success: true,
            data: tours,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            error: error,
        });
    }
};
