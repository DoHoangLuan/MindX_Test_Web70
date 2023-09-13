const { SECRET_KEY } = require("./utils");
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(400).json({
            message: 'Token không được cung cấp',
        });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({
                message: 'Token hết hạn',
            });
        }
        return res.status(401).json({
            message: 'Token không hợp lệ',
        });
    }
};

module.exports = { authMiddleware }