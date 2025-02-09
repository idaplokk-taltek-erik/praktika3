const Book = require('../models/book');

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
