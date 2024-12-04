import User from "../models/Users.js";
import { UserZodSchema } from "../types/index.js";
export const createUser = async (req, res) => {
    try {
        const user = UserZodSchema.parse(req.body);
        const newUser = new User(user);
        const savedUser = await newUser.save();
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
export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = UserZodSchema.parse(req.body);
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: user,
        }, { new: true });
        res.status(200).json({
            status: true,
            data: updatedUser,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error,
        });
    }
};
export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await User.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            data: response,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error,
        });
    }
};
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ sucess: true, message: "No Data Found" });
        }
        res.status(200).json({
            status: true,
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error,
        });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            res.status(404).json({ sucess: true, message: "No Data Found" });
        }
        res.status(200).json({
            status: true,
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error,
        });
    }
};
