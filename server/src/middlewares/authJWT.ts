import JWT from "jsonwebtoken";

export const auth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: "You are not authenticated!"
        });
    }
    const token = authorization.split(" ")[1];
    JWT.verify(token,"333-4444-55555", (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "token is not valid"
            })
        }
        req.user = user;
        next();
    })
};