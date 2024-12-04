import type { Request, Response } from "express";

import User from "../models/Users.js";
import { UserZodSchema, UserConstructor } from "../types/index.js";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = UserZodSchema.parse(req.body);
    const newUser = new User(user);
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      data: savedUser as UserConstructor,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = UserZodSchema.parse(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: user,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedUser as UserConstructor,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ sucess: true, message: "No Data Found" });
    }
    res.status(200).json({
      success: true,
      data: user as UserConstructor,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json({ sucess: true, message: "No Data Found" });
    }
    res.status(200).json({
      success: true,
      data: users as UserConstructor[],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

