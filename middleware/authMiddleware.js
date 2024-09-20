const jwt = require('jsonwebtoken');
const logger = require('../config/logger')

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET );
        req.admin = decoded;
        next();
    } catch (error) {
        logger.writeLog(error)
        res.status(401).json({ message: "Invalid JWT token" });
    }
};

module.exports = authMiddleware;
