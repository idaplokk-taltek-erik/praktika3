const activityLogController = require('../controllers/activity_log_controller');

const getAllActivityLogsSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          activity_id: { type: 'number' },
          api_token_id: { type: 'number' },
          endpoint: { type: 'string' },
          method: { type: 'string' },
          before: { type: ['object', 'null'] },
          after: { type: ['object', 'null'] },
        },
      },
    },
  },
};

async function activityLogRoutes(fastify, options) {
  fastify.get(
    '/activity_log',
    { schema: getAllActivityLogsSchema },
    activityLogController.getAllActivityLogs,
  );
}

module.exports = activityLogRoutes;
