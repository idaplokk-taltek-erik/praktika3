const Book = require('../models/book');
const Comment = require('../models/comment');

exports.getAllBooks = async (request, reply) => {
  try {
    const books = await Book.findAll();
    return books;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.getBookById = async (request, reply) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
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
    reply.code(201).send(newBook);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.updateBook = async (request, reply) => {
  try {
    const { id } = request.params;
    const { name, isbn, author_name, genre_name, released_at } = request.body;
    const updatedRows = await Book.update(id, {
      name,
      isbn,
      author_name,
      genre_name,
      released_at,
    });
    if (updatedRows === 0) {
      return reply.code(404).send({ error: 'Book not found' });
    }
    const updatedBook = await Book.findById(id);
    reply.send(updatedBook);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

exports.getBookComments = async (request, reply) => {
  try {
    const { id } = request.params;
    // Query the comment table for comments associated with the given book id.
    const comments = await Comment.findByBookId(id);
    if (!comments || comments.length === 0) {
      return reply.code(404).send({ error: 'No comments found for this book' });
    }
    return comments;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
