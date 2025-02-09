/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('api_token', (table) => {
    table.increments('token_id').primary(); // Primary key for the token table
    table.integer('group_id').unsigned().notNullable();
    table.string('jwt_token').notNullable();
    table.timestamp('issued_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('expired_at').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('api_token');
};
