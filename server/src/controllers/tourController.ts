import type { Request, Response } from "express";

import Tour from "../models/Tours.js";
import { ToursConstructor, ToursZodSchema } from "../types/index.js";

export const createTour = async (req: Request, res: Response) => {
  try {
    const newTour = ToursZodSchema.parse(req.body);

    const tour = new Tour(newTour);

    const savedTour = await tour.save();

    res.status(200).json({
      success: true,
      data: savedTour as ToursConstructor,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const updateTourById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTour = ToursZodSchema.parse(req.body);
    const tour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: updatedTour,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: tour as ToursConstructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const deleteTourById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const getSingleTourById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json("No Id Found");
      return;
    }
    const tour = await Tour.findById(id);
    if (!tour) {
      res.status(404).json({ success: true, message: "No data found" });
      return;
    }
    res.status(200).json({
      success: true,
      data: tour as ToursConstructor,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getTourByTitle = async (req: Request, res: Response) => {
  try {
    const { title } = req.params;
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
      data: tour as ToursConstructor,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find();

    if (!tours) {
      res.status(404).json({ success: true, message: "No data found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: tours as ToursConstructor[],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const getFeaturedTours = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find({ featured: true });

    if (!tours) {
      res.status(404).json({ success: true, message: "No data found" });
      return;
    }
    res.status(200).json({
      success: true,
      data: tours as ToursConstructor[],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
