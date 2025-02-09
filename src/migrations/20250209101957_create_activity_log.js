/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('activity_log', (table) => {
      // Adding an auto-incrementing primary key is optional, but recommended.
      table.increments('activity_id').primary();
      table.integer('api_token_id').unsigned().notNullable();
      table.string('endpoint').notNullable();
      table.string('method').notNullable();
      // Store JSON data as text; many DBs (e.g. SQLite) do not have a native JSON type.
      table.json('before').nullable();
      table.json('after').nullable();
    })
    .then(function () {
      // Create a trigger to disallow UPDATE operations.
      return knex.raw(`
          CREATE TRIGGER no_update_activity_log
          BEFORE UPDATE ON activity_log
          BEGIN
            SELECT RAISE(FAIL, 'Updates are not allowed on activity_log');
          END;
        `);
    })
    .then(function () {
      // Create a trigger to disallow DELETE operations.
      return knex.raw(`
          CREATE TRIGGER no_delete_activity_log
          BEFORE DELETE ON activity_log
          BEGIN
            SELECT RAISE(FAIL, 'Deletes are not allowed on activity_log');
          END;
        `);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex
    .raw(`DROP TRIGGER IF EXISTS no_update_activity_log;`)
    .then(function () {
      return knex.raw(`DROP TRIGGER IF EXISTS no_delete_activity_log;`);
    })
    .then(function () {
      return knex.schema.dropTableIfExists('activity_log');
    });
};
