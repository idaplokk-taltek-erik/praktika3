// src/models/api_token.js
const knex = require('../db');

class ApiToken {
  /**
   * Create a new API token record.
   * @param {Object} param0
   * @param {number} param0.group_id
   * @param {string} param0.jwt_token
   * @param {string} param0.issued_at - ISO date string
   * @param {string|null} param0.expired_at - ISO date string or null
   * @returns {Promise<Object>} The created token record.
   */
  static create({ group_id, jwt_token, issued_at, expired_at }) {
    return knex('api_token')
      .insert({ group_id, jwt_token, issued_at, expired_at })
      .returning(['token_id', 'group_id', 'jwt_token', 'issued_at', 'expired_at'])
      .then(([token]) => token);
  }

  /**
   * Find an API token record by token_id.
   * @param {number} token_id
   * @returns {Promise<Object|null>}
   */
  static findById(token_id) {
    return knex('api_token')
      .where({ token_id })
      .first();
  }

  /**
   * Retrieve all API token records.
   * @returns {Promise<Array<Object>>}
   */
  static findAll() {
    return knex('api_token').select('*');
  }
}

module.exports = ApiToken;
