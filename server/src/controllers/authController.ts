import type { Request, Response } from "express";
// import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import { GenerateHashPassword } from "../utils/hashPassword.js";
import { UserZodSchema } from "../types/index.js";

// registeration
export const registerUser = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error,
    });
  }
}

// login
// export const login = async (req, res) => {
//     const email = req.body.email;
//     const pass = req.body.password;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not Found"
//             })
//         }

//         const checkPassword = await bcrypt.compare(pass, user.password);

//         if (!checkPassword) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Incorrect Email or Password"
//             })
//         }

//         const { password, role, ...rest } = user._doc;

//         // create jwt token
//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })

//         // set token in browser cookies and send response to client
//         res.cookie('accessToken',token,{
//             httpOnly:true,
//             expires:token.expiresIn
//         }).status(200).json({token,data:{...rest},role})

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed To login"
//         })
//     }
// };
