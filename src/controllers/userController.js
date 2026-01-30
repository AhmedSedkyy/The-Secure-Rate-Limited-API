const userServices = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler')



/**
 * @desc    Register a new user account
 * @route   POST /api/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {

    const context = { data: req.body, ip: req.ip }

    const result = await userServices.register(context);

    res.status(201).json({ success: true, data: result });
})


/**
 * @desc    Authenticate user and login in 
 * @route   POST /api/login
 * @access  Public
 */

const login = asyncHandler(async (req, res) => {

    const context = { data: req.body, ip: req.ip }

    const result = await userServices.login(context);

    res.status(200).json({ success: true, data: result });
})



/**
 * @desc    Get user's profile
 * @route   GET /api/profile
 * @access  Private
 */


const profile = asyncHandler(async (req, res) => {

    const result = await userServices.profile(req.user.id);

    res.status(200).json({ success: true, data: result });
})



module.exports = { register, login, profile }
