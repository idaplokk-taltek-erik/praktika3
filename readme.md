# praktika2

OpenAPI documentation available at

> http://localhost:3000/documentation

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

## Testing API with cURL

Generate jwt-token for your purpose.

#### Get a book

```sh
curl -X GET "http://localhost:3000/books/3" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MSwiaWF0IjoxNzM5MDk1Njg0LCJleHAiOjE3NzA2NTMyODR9.zgtyQbIGEm6Q1Fsg3qN2DyDBFO1PNfqBiQKw5wW-Tu8"
```

#### Update book

With admin token

```sh
curl -X PUT "http://localhost:3000/books/3" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MSwiaWF0IjoxNzM5MDk1Njg0LCJleHAiOjE3NzA2NTMyODR9.zgtyQbIGEm6Q1Fsg3qN2DyDBFO1PNfqBiQKw5wW-Tu8" \
  -d '{"name": "Updated Book Name"}'
```

With user token it fails

```sh
curl -X PUT "http://localhost:3000/books/3" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MywiaWF0IjoxNzM5MDk1NzA0LCJleHAiOjE3NzA2NTMzMDR9.DlD6KHttjegg9VO4Q-Du_6xvlf_0GfvSln2F4dq0Ke4" \
  -d '{"name": "Updated Book Name AS User"}'
```

#### Add a comment

As admin

```sh
curl -X POST "http://localhost:3000/comments" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MSwiaWF0IjoxNzM5MDk1Njg0LCJleHAiOjE3NzA2NTMyODR9.zgtyQbIGEm6Q1Fsg3qN2DyDBFO1PNfqBiQKw5wW-Tu8" \
  -H "Content-Type: application/json" \
  -d '{
        "text": "This is a comment on book 4 by ADMIN.",
        "book_id": 4
      }'
```

As user

```sh
curl -X POST "http://localhost:3000/comments" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MywiaWF0IjoxNzM5MDk1NzA0LCJleHAiOjE3NzA2NTMzMDR9.DlD6KHttjegg9VO4Q-Du_6xvlf_0GfvSln2F4dq0Ke4" \
  -H "Content-Type: application/json" \
  -d '{
        "text": "This is a comment on book 4.",
        "book_id": 4
      }'
```


#### Read comments, should have corresponding api_token_id set via JWT token

```sh
curl -X GET "http://localhost:3000/books/4/comments" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cF9pZCI6MywiaWF0IjoxNzM5MDk1NzA0LCJleHAiOjE3NzA2NTMzMDR9.DlD6KHttjegg9VO4Q-Du_6xvlf_0GfvSln2F4dq0Ke4"
```
