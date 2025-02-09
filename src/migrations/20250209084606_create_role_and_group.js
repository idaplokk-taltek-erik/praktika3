/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Create the role table
  await knex.schema.createTable('role', (table) => {
    table.increments('role_id').primary();
    table.string('role_name').notNullable();
    // role_access will store an array of objects (e.g. [{endpoint, method}, ...])
    table.json('role_access').notNullable().defaultTo('[]');
  });

  // Create the group table
  // Note: “group” is a reserved keyword in some SQL dialects.
  // Using quotes in raw SQL or an alternative name (e.g., user_group) is recommended.
  await knex.schema.createTable('group', (table) => {
    table.increments('group_id').primary();
    table.string('name').notNullable();
    // role_ids will store an array of role_id numbers, for example: [1,2]
    table.json('role_ids').notNullable().defaultTo('[]');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('group');
  await knex.schema.dropTableIfExists('role');
};
