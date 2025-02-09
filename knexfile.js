// knexfile.js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite3',
    },
    migrations: {
      directory: './src/migrations',
    },
    useNullAsDefault: true, // Recommended for SQLite3
  },
};
