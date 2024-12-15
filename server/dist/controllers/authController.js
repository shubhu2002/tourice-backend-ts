import User from "../models/Users.js";
import { CheckPassword, GenerateHashPassword } from "../utils/hashPassword.js";
import { UserZodSchema } from "../types/index.js";
import { GenerateJWT } from "../utils/jwt.js";
// registeration
export const registerUser = async (req, res) => {
    try {
        const user = UserZodSchema.parse(req.body);
        console.log("user", user);
        const hashedPassword = await GenerateHashPassword(user.password);
        const newUser = new User({
            username: user.username,
            email: user.email,
            password: hashedPassword,
        });
        const data = await newUser.save();
        res.status(200).json({
            status: true,
            newUser: data,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error,
        });
    }
};
// login
export const loginUser = async (req, res) => {
    try {
        const user = UserZodSchema.parse(req.body);
        const validUser = await User.findOne({ email: user.email });
        if (!validUser) {
            res.status(404).json({
                status: false,
                message: "User not Found",
            });
            return;
        }
        const checkPassword = await CheckPassword(user.password, validUser.password);
        if (!checkPassword) {
            res.status(401).json({
                status: false,
                message: "Incorrect Password",
            });
            return;
        }
        const isAdmin = user.email === process.env.ADMIN_EMAIL;
        const token = GenerateJWT(validUser._id, validUser.email, isAdmin);
        res
            .cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        })
            .status(200)
            .json({
            status: true,
            token,
            isAdmin,
            id: validUser._id,
            email: validUser.email,
            username: validUser.username,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error,
        });
    }
};
