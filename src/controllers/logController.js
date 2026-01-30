const logsService = require('../services/logsService');
const asyncHandler = require('../utils/asyncHandler')




/**
 * @desc    Get all system logs
 * @route   GET /api/log
 * @access  Admin
 */

const getAllLogs = asyncHandler(async (req, res) => {

    const result = await logsService.getAllLogs();

    res.status(200).json({ success: true, data: result });

})


module.exports = { getAllLogs }
