const bookController = require('../controllers/book_controller');

const createBookSchema = {
  body: {
    type: 'object',
    required: ['name', 'isbn', 'author_name', 'genre_name', 'released_at'],
    properties: {
      name: { type: 'string' },
      isbn: { type: 'string' },
      author_name: { type: 'string' },
      genre_name: { type: 'string' },
      released_at: { type: 'string', format: 'date-time' },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        book_id: { type: 'number' },
        name: { type: 'string' },
        isbn: { type: 'string' },
        author_name: { type: 'string' },
        genre_name: { type: 'string' },
        released_at: { type: 'string', format: 'date-time' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
  },
};

// JSON schema for retrieving a book by id
const getBookByIdSchema = {
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
        book_id: { type: 'number' },
        name: { type: 'string' },
        isbn: { type: 'string' },
        author_name: { type: 'string' },
        genre_name: { type: 'string' },
        released_at: { type: 'string', format: 'date-time' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
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

async function bookRoutes(fastify, options) {
  fastify.get('/books', bookController.getAllBooks);
  fastify.get(
    '/book/:id',
    { schema: getBookByIdSchema },
    bookController.getBookById,
  );
  fastify.post(
    '/book',
    { schema: createBookSchema },
    bookController.createBook,
  );
}

module.exports = bookRoutes;
