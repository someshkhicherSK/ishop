const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_KEY_JWT || process.env.SECRETKEY;

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(402).json({ msg: "unAuthrize person...", success: false });
        }

        if (!JWT_SECRET) {
            return res.status(500).json({ msg: "JWT secret missing in env", success: false });
        }

        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: "token is no valid...", success: false });
    }
};

module.exports = authMiddleware;