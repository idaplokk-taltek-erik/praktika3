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
      .returning(['api_token_id', 'group_id', 'jwt_token', 'issued_at', 'expired_at'])
      .then(([token]) => token);
  }

  /**
   * Find an API token record by api_token_id.
   * @param {number} api_token_id
   * @returns {Promise<Object|null>}
   */
  static findById(api_token_id) {
    return knex('api_token')
      .where({ api_token_id })
      .first();
  }

  /**
   * Find an API token record by api_token_id.
   * @param {string} jwt_token
   * @returns {Promise<Object|null>}
   */
  static findByToken(jwt_token) {
    return knex('api_token')
      .where({ jwt_token })
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
