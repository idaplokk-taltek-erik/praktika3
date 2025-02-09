# praktika2

## Install dependencies

```sh
npm install
```

## Run service

```sh
npm run dev
```

## Authorization

To generate a user/admin token then run

```sh
npm run jwt:generate
```

## Database

### Code-first database

The benefit is that the code can be started up in an any new environment and the database schema evolves as a brother to the code.

In order to modify the database schema a migration should be created.

```sh
npm run migration:create create_user
```

Now the migration can be executed.

```sh
npm run migration:run
```

If something went wrong:

```sh
npm run migration:rollback
```

### Create test data

```sh
sqlite3 database.sqlite3 < .sql/book_data.sql
sqlite3 database.sqlite3 < .sql/user_group_role_data.sql
```
