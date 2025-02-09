const Book = require('../models/book');
const Comment = require('../models/comment');
const ActivityLog = require('../models/activity_log');

exports.getAllBooks = async (request, reply) => {
  try {
    const books = await Book.findAll();

    await ActivityLog.create({
      api_token_id: request.user.api_token_id,
      endpoint: request.raw.url, // or request.routerPath if available
      method: request.method,
      before: null,
      after: null,
    });

    return books;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.getBookById = async (request, reply) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    await ActivityLog.create({
      api_token_id: request.user.api_token_id,
      endpoint: request.raw.url,
      method: request.method,
      before: null,
      after: null,
    });

    if (!book) {
      return reply.code(404).send({ error: 'Book not found' });
    }
    return book;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.createBook = async (request, reply) => {
  try {
    const { name, isbn, author_name, genre_name, released_at } = request.body;
    const newBook = await Book.create({
      name,
      isbn,
      author_name,
      genre_name,
      released_at,
    });

    await ActivityLog.create({
      api_token_id: request.user.api_token_id,
      endpoint: request.raw.url,
      method: request.method,
      before: null,
      after: newBook,
    });

    reply.code(201).send(newBook);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.updateBook = async (request, reply) => {
  try {
    const { id } = request.params;

    const originalBook = await Book.findById(id);
    if (!originalBook) {
      return reply.code(404).send({ error: 'Book not found' });
    }

    const { name, isbn, author_name, genre_name, released_at } = request.body;
    await Book.update(id, {
      name,
      isbn,
      author_name,
      genre_name,
      released_at,
    });

    const updatedBook = await Book.findById(id);

    await ActivityLog.create({
      api_token_id: request.user.api_token_id,
      endpoint: request.raw.url,
      method: request.method,
      before: originalBook,
      after: updatedBook,
    });

    reply.send(updatedBook);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.getBookComments = async (request, reply) => {
  try {
    const { id } = request.params;
    const comments = await Comment.findByBookId(id);

    await ActivityLog.create({
      api_token_id: request.user.api_token_id,
      endpoint: request.raw.url,
      method: request.method,
      before: null,
      after: null,
    });

    if (!comments || comments.length === 0) {
      return reply.code(404).send({ error: 'No comments found for this book' });
    }
    return comments;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
