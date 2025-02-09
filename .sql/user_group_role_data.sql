-- .sql/group_role_data.sql

INSERT INTO role (role_name, role_access) VALUES 
  ('api_token_read',    '[{"endpoint": "/api_tokens", "method": "GET"}]'),
  ('api_token_write',   '[{"endpoint": "/api_tokens", "method": "POST"}, {"endpoint": "/api_tokens", "method": "PUT"}, {"endpoint": "/api_tokens", "method": "DELETE"}]'),
  ('comment_read',      '[{"endpoint": "/comments", "method": "GET"}]'),
  ('comment_write',     '[{"endpoint": "/comments", "method": "POST"}]'),
  ('book_read',         '[{"endpoint": "/books", "method": "GET"}]'),
  ('book_write',        '[{"endpoint": "/books", "method": "POST"}, {"endpoint": "/books", "method": "PUT"}, {"endpoint": "/books", "method": "DELETE"}]'),
  ('activity_log_read', '[{"endpoint": "/activity_log", "method": "GET"}]');

INSERT INTO "group" (name, role_ids) VALUES 
  ('admin',   '[1,2,3,4,5,6,7]'),
  ('manager', '[1,3,4,5,6,7]'),
  ('user',    '[5,4]');
