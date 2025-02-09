const ActivityLog = require('../models/activity_log');

exports.getAllActivityLogs = async (request, reply) => {
  try {
    const logs = await ActivityLog.findAll();

    return logs;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
