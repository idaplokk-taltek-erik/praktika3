/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('book', (table) => {
    table.increments('book_id').primary();
    table.string('name').notNullable();
    table.string('isbn').notNullable().unique();
    table.string('author_name').notNullable();
    table.string('genre_name').notNullable();
    table.timestamp('released_at').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('book');
};
