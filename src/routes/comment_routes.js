// src/routes/comment_routes.js
const commentController = require('../controllers/comment_controller');

const createCommentSchema = {
  body: {
    type: 'object',
    required: ['text', 'api_token_id', 'book_id'],
    properties: {
      text: { type: 'string' },
      api_token_id: { type: 'number' },
      book_id: { type: 'number' },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        comment_id: { type: 'number' },
        text: { type: 'string' },
        api_token_id: { type: 'number' },
        book_id: { type: 'number' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
        likes_count: { type: 'number' },
      },
    },
  },
};

const getCommentByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }, // Path parameters are strings by default
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        comment_id: { type: 'number' },
        text: { type: 'string' },
        api_token_id: { type: 'number' },
        book_id: { type: 'number' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
        likes_count: { type: 'number' },
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

async function commentRoutes(fastify, options) {
  fastify.get('/comments', commentController.getAllComments);
  fastify.get(
    '/comments/:id',
    { schema: getCommentByIdSchema },
    commentController.getCommentById,
  );
  fastify.post(
    '/comments',
    { schema: createCommentSchema },
    commentController.createComment,
  );
}

module.exports = commentRoutes;
