# praktika2

OpenAPI documentation available at

> http://localhost:3000/documentation

It is possible to set the bearer token via `Authorize` button and use the UI to make requests.

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

The database in the repo is already set-up and the created JWT tokens are listed in the cURL commands below.

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

## Testing API with cURL

Generate jwt-token for your purpose.

#### Get a book

```sh
curl -X GET "http://localhost:3000/books/3" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MSwiaWF0IjoxNzM5MDk2NzYyLCJleHAiOjE3NzA2NTQzNjJ9.-4xbAERgRravSNKORHwp2bsdwe69k0mJbQPdsTPm_Bs"
```

#### Update book

With admin token

```sh
curl -X PUT "http://localhost:3000/books/3" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MSwiaWF0IjoxNzM5MDk2NzYyLCJleHAiOjE3NzA2NTQzNjJ9.-4xbAERgRravSNKORHwp2bsdwe69k0mJbQPdsTPm_Bs" \
  -d '{"name": "Updated Book Name"}'
```

With user token it fails

```sh
curl -X PUT "http://localhost:3000/books/3" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MywiaWF0IjoxNzM5MDk2NzcyLCJleHAiOjE3NzA2NTQzNzJ9.EVnUYf-S25WPxu2MatKeRyLwmqoqnmh068btd0pCcEA" \
  -d '{"name": "Updated Book Name AS User"}'
```

#### Add a comment

As admin

```sh
curl -X POST "http://localhost:3000/comments" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MSwiaWF0IjoxNzM5MDk2NzYyLCJleHAiOjE3NzA2NTQzNjJ9.-4xbAERgRravSNKORHwp2bsdwe69k0mJbQPdsTPm_Bs" \
  -H "Content-Type: application/json" \
  -d '{
        "text": "This is a comment on book 4 by ADMIN.",
        "book_id": 4
      }'
```

As user

```sh
curl -X POST "http://localhost:3000/comments" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MywiaWF0IjoxNzM5MDk2NzcyLCJleHAiOjE3NzA2NTQzNzJ9.EVnUYf-S25WPxu2MatKeRyLwmqoqnmh068btd0pCcEA" \
  -H "Content-Type: application/json" \
  -d '{
        "text": "This is a comment on book 4.",
        "book_id": 4
      }'
```

#### Read comments, should have corresponding api_token_id set via JWT token

```sh
curl -X GET "http://localhost:3000/books/4/comments" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MywiaWF0IjoxNzM5MDk2NzcyLCJleHAiOjE3NzA2NTQzNzJ9.EVnUYf-S25WPxu2MatKeRyLwmqoqnmh068btd0pCcEA"
```

#### Read activity log

As admin

```sh
curl -X GET "http://localhost:3000/activity_log" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MSwiaWF0IjoxNzM5MDk2NzYyLCJleHAiOjE3NzA2NTQzNjJ9.-4xbAERgRravSNKORHwp2bsdwe69k0mJbQPdsTPm_Bs"
```
