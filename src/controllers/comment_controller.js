const Comment = require('../models/comment');
const ActivityLog = require('../models/activity_log');

exports.getAllComments = async (request, reply) => {
  try {
    const comments = await Comment.findAll();

    await ActivityLog.create({
      api_token_id: request.user.api_token_id,
      endpoint: request.raw.url, // or request.routerPath if available
      method: request.method,
      before: null,
      after: null,
    });

    return comments;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.getCommentById = async (request, reply) => {
  try {
    const { id } = request.params;
    const comment = await Comment.findById(id);

    await ActivityLog.create({
      api_token_id: request.user.api_token_id,
      endpoint: request.raw.url,
      method: request.method,
      before: null,
      after: null,
    });

    if (!comment) {
      return reply.code(404).send({ error: 'Comment not found' });
    }
    return comment;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.createComment = async (request, reply) => {
  try {
    const { text, book_id } = request.body;
    const api_token_id = request.user.api_token_id;
    const newComment = await Comment.create({ text, api_token_id, book_id });

    await ActivityLog.create({
      api_token_id: request.user.api_token_id,
      endpoint: request.raw.url,
      method: request.method,
      before: null,
      after: newComment,
    });

    reply.code(201).send(newComment);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
