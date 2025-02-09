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

const updateBookSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }, // Path parameters are strings by default
    },
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      isbn: { type: 'string' },
      author_name: { type: 'string' },
      genre_name: { type: 'string' },
      released_at: { type: 'string', format: 'date-time' },
    },
    additionalProperties: false,
    description: 'At least one property must be provided for update',
    // Optionally, you can enforce that at least one property is present
    // using "minProperties": 1
    // minProperties: 1
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

const getBookCommentsSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }, // Path parameter (book id) is a string by default
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
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
    '/books/:id',
    { schema: getBookByIdSchema },
    bookController.getBookById,
  );
  fastify.post(
    '/books',
    { schema: createBookSchema },
    bookController.createBook,
  );
  fastify.put(
    '/books/:id',
    { schema: updateBookSchema },
    bookController.updateBook,
  );
  fastify.get(
    '/books/:id/comments',
    { schema: getBookCommentsSchema },
    bookController.getBookComments,
  );
}

module.exports = bookRoutes;
