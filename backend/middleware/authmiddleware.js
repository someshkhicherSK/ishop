const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(402).json({ msg: "unAuthrize person...", success: false });
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.user = decode;
        next();

    } catch (error) {
        console.log(error)
        return res.status(301).json({ msg: "token is no valid...", success: false });
    }
}
module.exports = authMiddleware;