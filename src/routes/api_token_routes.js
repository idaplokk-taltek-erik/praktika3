// src/routes/api_token_routes.js
const apiTokenController = require('../controllers/api_token_controller');

// JSON schema for creating a new API token
const createTokenSchema = {
  body: {
    type: 'object',
    required: ['group_id', 'jwt_token', 'issued_at'],
    properties: {
      group_id: { type: 'number' },
      jwt_token: { type: 'string' },
      issued_at: { type: 'string', format: 'date-time' },
      expired_at: { type: 'string', format: 'date-time' }, // optional/nullable
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        api_token_id: { type: 'number' },
        group_id: { type: 'number' },
        jwt_token: { type: 'string' },
        issued_at: { type: 'string', format: 'date-time' },
        expired_at: { type: 'string', format: 'date-time' },
      },
    },
  },
};

// JSON schema for retrieving a token by id
const getTokenByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        api_token_id: { type: 'number' },
        group_id: { type: 'number' },
        jwt_token: { type: 'string' },
        issued_at: { type: 'string', format: 'date-time' },
        expired_at: { type: 'string', format: 'date-time' },
      },
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
};

async function apiTokenRoutes(fastify, options) {
  fastify.get('/api_tokens', apiTokenController.getAllTokens);
  fastify.get(
    '/api_tokens/:id',
    { schema: getTokenByIdSchema },
    apiTokenController.getTokenById,
  );
  fastify.post(
    '/api_tokens',
    { schema: createTokenSchema },
    apiTokenController.createToken,
  );
}

module.exports = apiTokenRoutes;
