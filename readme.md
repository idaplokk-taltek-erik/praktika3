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

In order to modify the database schema a migration should be created

```sh
npm run migration:create create_user
```

Now the migration can be executed

```sh
npm run migration:run
```

If something went wrong

```sh
npm run migration:rollback
```

### Test data

```sh
sqlite3 database.sqlite3 < .sql/user_group_role_data.sql
```
