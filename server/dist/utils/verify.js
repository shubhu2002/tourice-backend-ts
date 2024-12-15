import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "You are not authorize" });
    }
    // if token is exist than verify it
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res
                .status(500)
                .json({ success: false, message: "token is invalid" });
        }
        req.user = user;
        next();
    });
};
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.parms.id || req.user.role === "admin") {
            next();
        }
        else {
            return res
                .status(401)
                .json({ success: false, message: "You are not authenticated" });
        }
    });
};
