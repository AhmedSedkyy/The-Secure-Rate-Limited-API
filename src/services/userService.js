const prisma = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logsService = require('./logsService');
const appError = require("../utils/appError");





const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}



const register = async (context) => {

    const { name, email, password } = context.data;

    const existEmail = await prisma.user.findUnique({ where: { email } });

    if (existEmail)
        throw new appError('The user is already registered', 400);

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword
        }
    });
    const token = generateToken({ id: newUser.id });

    logsService.createLog({
        action: "USER_REGISTER",
        description: `User ${newUser.name} register in`,
        userId: newUser.id,
        ipAddress: context.ip
    })

    return token;
}



const login = async (context) => {

    const { email, password } = context.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        logsService.createLog({
            action: "FAILED_LOGIN",
            description: `Failed login attempt for email ${email}`,
            userId: user ? user.id : null,
            ipAddress: context.ip
        })
        throw new appError('Incorrect login details', 401);
    }

    const token = generateToken({ id: user.id, role: user.role });


    logsService.createLog({
        action: "USER_LOGIN",
        description: `User ${user.name} login in`,
        userId: user.id,
        ipAddress: context.ip
    })

    return token;
}




const profile = async (userId) => {

    const user = await prisma.user.findUnique({ where: { id: userId }, omit: { password: true } });

    return user;
}



module.exports = { register, login, profile }