// src/controllers/comment_controller.js
const Comment = require('../models/comment');

exports.getAllComments = async (request, reply) => {
  try {
    const comments = await Comment.findAll();
    return comments;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.getCommentById = async (request, reply) => {
  try {
    const { id } = request.params;
    const comment = await Comment.findById(id);
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
    const { text, api_token_id, book_id } = request.body;
    const newComment = await Comment.create({ text, api_token_id, book_id });
    reply.code(201).send(newComment);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
