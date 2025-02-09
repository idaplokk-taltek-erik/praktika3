// src/models/group.js
const knex = require('../db');

class Auth {
  /**
   * Retrieve a group by its ID.
   * @param {number} group_id
   * @returns {Promise<Object|null>}
   */
  static async findById(group_id) {
    return knex('group').where({ group_id }).first();
  }

  /**
   * Retrieve the roles for a given group.
   * Assumes the group table has a column "role_ids" stored as JSON.
   * @param {number} group_id
   * @returns {Promise<Array<Object>>} Array of role records.
   */
  static async getRoles(group_id) {
    const group = await this.findById(group_id);
    if (!group) return [];
    let roleIds;
    try {
      // Parse the stored JSON array of role IDs.
      roleIds = JSON.parse(group.role_ids);
    } catch (e) {
      roleIds = [];
    }
    return knex('role').whereIn('role_id', roleIds);
  }
}

module.exports = Auth;
