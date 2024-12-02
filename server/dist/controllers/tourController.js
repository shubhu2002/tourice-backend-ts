import z from "zod";
import Tour from "../models/Tours.js";
import { ToursZodSchema } from "../types/index.js";
export const createTour = async (req, res) => {
    try {
        const newTour = ToursZodSchema.parse(req.body);
        const tour = new Tour(newTour);
        const savedTour = await tour.save();
        res.status(200).json({
            success: true,
            data: savedTour,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};
export const updateTourById = async (req, res) => {
    try {
        const id = z.object({ id: z.string() }).parse(req.params);
        const updatedTour = ToursZodSchema.parse(req.body);
        const tour = await Tour.findByIdAndUpdate(id, {
            $set: updatedTour,
        }, { new: true });
        res.status(200).json({
            success: true,
            data: tour,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};
export const deleteTourById = async (req, res) => {
    try {
        const id = z.object({ id: z.string() }).parse(req.params);
        const response = await Tour.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Successfully Deleted",
            data: response,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};
export const getSingleTourById = async (req, res) => {
    try {
        const { id } = z.object({ id: z.string() }).parse(req.params);
        const tour = await Tour.findById(id);
        if (!tour) {
            res.status(404).json({ success: true, message: "No data found" });
            return;
        }
        res.status(200).json({
            success: true,
            data: tour,
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
        const tour = await Tour.findOne({ title });
        if (!tour) {
            res.status(404).json({ success: true, message: "No data found" });
            return;
        }
        res.status(200).json({
            success: true,
            data: tour,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
};
export const getAllTours = async (req, res) => {
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
export const getFeaturedTours = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true });
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