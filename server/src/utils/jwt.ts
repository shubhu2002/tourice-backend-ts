import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export const GenerateJWT = (
  userId: Types.ObjectId,
  email: string,
  isAdmin: boolean
) => {
  const token = jwt.sign({ userId, email, isAdmin }, SECRET_KEY, {
    expiresIn: "3d",
  });
  return token;
};

export const VerifyJWT = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
