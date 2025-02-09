-- Insert roles: manager and reader
INSERT INTO role (role_name, role_access) VALUES 
  ('manager', '[{"endpoint":"/users","method":"GET"}, {"endpoint":"/users","method":"POST"}]'),
  ('reader',  '[{"endpoint":"/users","method":"GET"}]');

-- Insert groups: admin and user
-- For this example, assume that the admin group is assigned the manager role (role_id = 1)
-- and the user group is assigned the reader role (role_id = 2).
INSERT INTO "group" (name, role_ids) VALUES 
  ('admin', '[1]'),
  ('user',  '[2]');

