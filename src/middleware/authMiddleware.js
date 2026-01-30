const jwt = require('jsonwebtoken');
const prisma = require('../config/database');
const appError = require("../utils/appError");


const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer'))
        throw new appError("Access Denied. No token provided", 401);

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!currentUser)
            throw new appError("User Not Found", 401);


        req.user = { id: currentUser.id, role: currentUser.role };
        next();
    } catch (err) {
        throw new appError("Invalid Token", 401);
    }
}


const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        throw new appError("Access denied. Admins only", 403);
    }
};




module.exports = { authenticate, adminOnly };