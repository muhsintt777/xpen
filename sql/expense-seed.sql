-- seed 1 random users
INSERT INTO
  expenses (amount, note, category_id, type, date, user_id)
SELECT
  round((random() * 4999 + 1)::numeric, 2) AS amount,
  'Expense 1st seed ' || i AS note,
  (
    SELECT
      id
    FROM
      categories
    ORDER BY
      random()
    LIMIT
      1
  ) AS category_id,
  (ARRAY['NEED', 'WANT', 'SAVE']) [1 + floor(random() * 3)::int] AS type,
  (
    EXTRACT(
      EPOCH
      FROM
        (
          CURRENT_TIMESTAMP - (random() * INTERVAL '365 days')
        )
    )::BIGINT
  ) AS date,
  (
    SELECT
      id
    FROM
      users
    ORDER BY
      random()
    LIMIT
      1
  ) AS user_id
FROM
  generate_series(1, 1000) AS i;

-- seed 2 (for user_id = 1)
INSERT INTO
  expenses (amount, note, category_id, type, date, user_id)
SELECT
  round((random() * 4999 + 1)::numeric, 2) AS amount,
  'Expense 2st seed ' || i AS note,
  (
    SELECT
      id
    FROM
      categories
    ORDER BY
      random()
    LIMIT
      1
  ) AS category_id,
  (ARRAY['NEED', 'WANT', 'SAVE']) [1 + floor(random() * 3)::int] AS type,
  (
    EXTRACT(
      EPOCH
      FROM
        (
          CURRENT_TIMESTAMP - (random() * INTERVAL '365 days')
        )
    )::BIGINT
  ) AS date,
  (1) AS user_id
FROM
  generate_series(1, 1000) AS i;

-- seed 3 random users
INSERT INTO
  expenses (amount, note, category_id, type, date, user_id)
SELECT
  round((random() * 4999 + 1)::numeric, 2) AS amount,
  'Expense 3rd seed ' || i AS note,
  (
    SELECT
      id
    FROM
      categories
    ORDER BY
      random()
    LIMIT
      1
  ) AS category_id,
  (ARRAY['NEED', 'WANT', 'SAVE']) [1 + floor(random() * 3)::int] AS type,
  (
    EXTRACT(
      EPOCH
      FROM
        (
          CURRENT_TIMESTAMP - (random() * INTERVAL '365 days')
        )
    )::BIGINT
  ) AS date,
  (
    SELECT
      id
    FROM
      users
    ORDER BY
      random()
    LIMIT
      1
  ) AS user_id
FROM
  generate_series(1, 8000) AS i;

-- seed 4 upto 100k
INSERT INTO
  expenses (amount, note, category_id, type, date, user_id)
SELECT
  round((random() * 4999 + 1)::numeric, 2) AS amount,
  'Expense 4th seed ' || i AS note,
  (
    SELECT
      id
    FROM
      categories
    ORDER BY
      random()
    LIMIT
      1
  ) AS category_id,
  (ARRAY['NEED', 'WANT', 'SAVE']) [1 + floor(random() * 3)::int] AS type,
  (
    EXTRACT(
      EPOCH
      FROM
        (
          CURRENT_TIMESTAMP - (random() * INTERVAL '365 days')
        )
    )::BIGINT
  ) AS date,
  (
    SELECT
      id
    FROM
      users
    ORDER BY
      random()
    LIMIT
      1
  ) AS user_id
FROM
  generate_series(1, 90000) AS i;
