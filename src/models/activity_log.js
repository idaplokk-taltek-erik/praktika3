// src/models/activity_log.js
const knex = require('../db');

class ActivityLog {
  /**
   * @param {Object} param0
   * @param {number} param0.api_token_id - The ID of the API token performing the action.
   * @param {string} param0.endpoint - The endpoint that was accessed.
   * @param {string} param0.method - The HTTP method used.
   * @param {Object|null} param0.before - The state before the action (optional).
   * @param {Object|null} param0.after - The state after the action (optional).
   * @returns {Promise<Object>} The inserted log record.
   */
  static create({ api_token_id, endpoint, method, before, after }) {
    return knex('activity_log')
      .insert({
        api_token_id,
        endpoint,
        method,
        before: before ? JSON.stringify(before) : null,
        after: after ? JSON.stringify(after) : null,
      })
      .returning('*')
      .then((rows) => rows[0]);
  }

  /**
   * @returns {Promise<Array<Object>>} An array of log records.
   */
  static findAll() {
    return knex('activity_log').select('*');
  }
}

module.exports = ActivityLog;
