// src/models/book.js
const knex = require('../db');

class Book {
  /**
   * Create a new book record.
   * @param {Object} param0 - Book data.
   * @param {string} param0.name
   * @param {string} param0.isbn
   * @param {string} param0.author_name
   * @param {string} param0.genre_name
   * @param {string} param0.released_at - ISO date string.
   * @returns {Promise<Object>} The created book record.
   */
  static create({ name, isbn, author_name, genre_name, released_at }) {
    return knex('book')
      .insert({ name, isbn, author_name, genre_name, released_at })
      .returning([
        'book_id',
        'name',
        'isbn',
        'author_name',
        'genre_name',
        'released_at',
        'created_at',
        'updated_at',
      ])
      .then(([book]) => book);
  }

  /**
   * Retrieve a book by its ID.
   * @param {number} book_id
   * @returns {Promise<Object|null>} The book record if found.
   */
  static findById(book_id) {
    return knex('book').where({ book_id }).first();
  }

  /**
   * Retrieve all books.
   * @returns {Promise<Array<Object>>} Array of book records.
   */
  static findAll() {
    return knex('book').select('*');
  }

  /**
   * Update a book record.
   * @param {number} bookId - The ID of the book to update.
   * @param {Object} updatedData - The fields to update.
   * @returns {Promise<Object>} The updated book record.
   */
  static update(bookId, updatedData) {
    // Update the updated_at field to current time
    updatedData.updated_at = new Date().toISOString();
    return knex('book')
      .where({ book_id: bookId })
      .update(updatedData)
      .then(() => this.findById(bookId));
  }
}

module.exports = Book;
