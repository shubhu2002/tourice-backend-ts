import User from "../models/Users.js";
import { CheckPassword, GenerateHashPassword } from "../utils/hashPassword.js";
import { UserZodSchema } from "../types/index.js";
import { GenerateJWT } from "../utils/jwt.js";
import { NotFoundError, UnauthorizedError } from "../errors/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const registerUser = asyncHandler(async (req, res) => {
    const user = UserZodSchema.parse(req.body);
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
});
export const loginUser = asyncHandler(async (req, res) => {
    const user = UserZodSchema.parse(req.body);
    const validUser = await User.findOne({ email: user.email });
    if (!validUser)
        throw new NotFoundError("User not Found");
    const checkPassword = await CheckPassword(user.password, validUser.password);
    if (!checkPassword)
        throw new UnauthorizedError("Incorrect Password");
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
});
