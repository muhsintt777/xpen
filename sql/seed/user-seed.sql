-- seed 1
INSERT INTO
  users (fullname, email, password)
SELECT
  'Test User ' || i,
  substr(md5(random()::text), 1, 10) || '@example.com',
  '$2b$05$2IKmAFHStBD4oZNuq6DegOy5.Wgc.1cY5hQQxwQfe.y0MVB03L8Vi'
FROM
  generate_series(1, 100) AS i;
