import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
export const GenerateJWT = (userId, email, isAdmin) => {
    const token = jwt.sign({ userId, email, isAdmin }, SECRET_KEY, {
        expiresIn: "3d",
    });
    return token;
};
export const VerifyJWT = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    }
    catch (error) {
        return null;
    }
};
