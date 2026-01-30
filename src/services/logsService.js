const prisma = require('../config/database');



const createLog = async ({ action, description, userId, taskId, ipAddress }) => {
    try {
        await prisma.logs.create({
        data: {
            action,
            description, 
            userId :userId || null,
            taskId :taskId || null,
            ipAddress:ipAddress || null
        }
        });
    } catch (error) {
        console.error(`Logging failed: ${error.message}`);
    }
};


const getAllLogs = async () => {

    const logs = await prisma.logs.findMany({orderBy: { createdAt: 'desc' }});

    return logs;
};

module.exports = {createLog,getAllLogs};