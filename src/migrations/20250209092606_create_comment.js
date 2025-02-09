/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('comment', (table) => {
    table.increments('comment_id').primary();
    table.text('text').notNullable();
    table
      .integer('api_token_id')
      .unsigned()
      .notNullable()
      .references('token_id')
      .inTable('api_token');
    table
      .integer('book_id')
      .unsigned()
      .notNullable()
      .references('book_id')
      .inTable('book');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.integer('likes_count').notNullable().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comment');
};
