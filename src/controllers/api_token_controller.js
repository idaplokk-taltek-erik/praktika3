// src/controllers/api_token_controller.js
const ApiToken = require('../models/api_token');

exports.getAllTokens = async (request, reply) => {
  try {
    const tokens = await ApiToken.findAll();
    return tokens;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.getTokenById = async (request, reply) => {
  try {
    const { id } = request.params;
    const token = await ApiToken.findById(id);
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
    reply.code(201).send(newToken);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
