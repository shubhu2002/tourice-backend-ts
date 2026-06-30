import User from "../models/Users.js";
import { UserZodSchema } from "../types/index.js";
import { NotFoundError } from "../errors/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const createUser = asyncHandler(async (req, res) => {
    const user = UserZodSchema.parse(req.body);
    const newUser = new User(user);
    const savedUser = await newUser.save();
    res.status(200).json({
        status: true,
        data: savedUser,
    });
});
export const updateUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = UserZodSchema.parse(req.body);
    const updatedUser = await User.findByIdAndUpdate(id, { $set: user }, { new: true });
    if (!updatedUser)
        throw new NotFoundError("User not found");
    res.status(200).json({
        status: true,
        data: updatedUser,
    });
});
export const deleteUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const response = await User.findByIdAndDelete(id);
    if (!response)
        throw new NotFoundError("User not found");
    res.status(200).json({
        status: true,
        data: response,
    });
});
export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
        throw new NotFoundError("No Data Found");
    res.status(200).json({
        status: true,
        data: user,
    });
});
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (!users || users.length === 0)
        throw new NotFoundError("No Data Found");
    res.status(200).json({
        status: true,
        data: users,
    });
});
