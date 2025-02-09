const knex = require('../db');

class Comment {
  /**
   * Create a new comment record.
   * @param {Object} param0
   * @param {string} param0.text
   * @param {number} param0.api_token_id
   * @param {number} param0.book_id
   * @returns {Promise<Object>} The created comment record.
   */
  static create({ text, api_token_id, book_id }) {
    return knex('comment')
      .insert({ text, api_token_id, book_id })
      .returning([
        'comment_id',
        'text',
        'api_token_id',
        'book_id',
        'created_at',
        'updated_at',
        'likes_count'
      ])
      .then(([comment]) => comment);
  }

  /**
   * Retrieve a comment by its ID.
   * @param {number} comment_id
   * @returns {Promise<Object|null>} The comment record if found.
   */
  static findById(comment_id) {
    return knex('comment')
      .where({ comment_id })
      .first();
  }

  /**
   * Retrieve all comments.
   * @returns {Promise<Array<Object>>} Array of comment records.
   */
  static findAll() {
    return knex('comment').select('*');
  }

  /**
   * Retrieve all comments for a specific book.
   * @param {number|string} book_id
   * @returns {Promise<Array<Object>>}
   */
  static findByBookId(book_id) {
    return knex('comment')
      .where({ book_id })
      .select('*');
  }  
}

module.exports = Comment;
