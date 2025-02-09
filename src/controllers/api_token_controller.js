const ApiToken = require('../models/api_token');
const ActivityLog = require('../models/activity_log');

exports.getAllTokens = async (request, reply) => {
  try {
    const tokens = await ApiToken.findAll();

    await ActivityLog.create({
      api_token_id: request.user.api_token_id,
      endpoint: request.raw.url, // or request.routerPath if available
      method: request.method,
      before: null,
      after: null,
    });
    return tokens;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.getTokenById = async (request, reply) => {
  try {
    const { id } = request.params;
    const token = await ApiToken.findById(id);

    await ActivityLog.create({
      api_token_id: request.user.api_token_id,
      endpoint: request.raw.url,
      method: request.method,
      before: null,
      after: null,
    });
    if (!token) {
      return reply.code(404).send({ error: 'API Token not found' });
    }
    return token;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.createToken = async (request, reply) => {
  try {
    const { group_id, jwt_token, issued_at, expired_at } = request.body;
    const newToken = await ApiToken.create({
      group_id,
      jwt_token,
      issued_at,
      expired_at,
    });

    await ActivityLog.create({
      api_token_id: request.user.api_token_id,
      endpoint: request.raw.url,
      method: request.method,
      before: null,
      after: newToken,
    });
    reply.code(201).send(newToken);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
