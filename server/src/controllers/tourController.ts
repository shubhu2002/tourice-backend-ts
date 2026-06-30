import type { Request, Response } from "express";

import Tour from "../models/Tours.js";
import { ToursConstructor, ToursZodSchema } from "../types/index.js";
import { NotFoundError } from "../errors/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTour = asyncHandler(async (req: Request, res: Response) => {
  const newTour = ToursZodSchema.parse(req.body);
  const tour = new Tour(newTour);
  const savedTour = await tour.save();

  res.status(200).json({
    status: true,
    data: savedTour as ToursConstructor,
  });
});

export const updateTourById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedTour = ToursZodSchema.parse(req.body);
    const tour = await Tour.findByIdAndUpdate(
      id,
      { $set: updatedTour },
      { new: true },
    );
    if (!tour) throw new NotFoundError("Tour not found");

    res.status(200).json({
      status: true,
      data: tour as ToursConstructor,
    });
  },
);

export const deleteTourById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await Tour.findByIdAndDelete(id);
    if (!response) throw new NotFoundError("Tour not found");

    res.status(200).json({
      status: true,
      message: "Successfully Deleted",
      data: response,
    });
  },
);

export const getSingleTourById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new NotFoundError("No Id Found");

    const tour = await Tour.findById(id);
    if (!tour) throw new NotFoundError("No data found");

    res.status(200).json({
      status: true,
      data: tour as ToursConstructor,
    });
  },
);

export const getTourByTitle = asyncHandler(
  async (req: Request, res: Response) => {
    const { title } = req.params;
    if (!title) throw new NotFoundError("No title Found");

    const tour = await Tour.findOne({ title });
    if (!tour) throw new NotFoundError("No data found");

    res.status(200).json({
      status: true,
      data: tour as ToursConstructor,
    });
  },
);

export const getAllTours = asyncHandler(async (req: Request, res: Response) => {
  const tours = await Tour.find();
  if (!tours || tours.length === 0)
    throw new NotFoundError("No data found");

  res.status(200).json({
    status: true,
    data: tours as ToursConstructor[],
  });
});

export const getFeaturedTours = asyncHandler(
  async (req: Request, res: Response) => {
    const featuredTours = await Tour.find({ featured: true });
    if (!featuredTours || featuredTours.length === 0)
      throw new NotFoundError("No data found");

    res.status(200).json({
      status: true,
      data: featuredTours as ToursConstructor[],
    });
  },
);
