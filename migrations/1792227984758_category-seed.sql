-- Up Migration
INSERT INTO
  categories (name)
SELECT
  category_name
FROM
  unnest(
    ARRAY[
      'Food',
      'Finance',
      'Bills',
      'Shopping',
      'Health',
      'Entertainment',
      'Education & Career',
      'Gifts',
      'Investment',
      'Transport',
      'Vehicle',
      'Housing',
      'Internet & Mobile',
      'Other'
    ]
  ) AS seeded (category_name)
ON CONFLICT (name) DO NOTHING;

-- Down Migration
DELETE FROM categories
WHERE
  name IN (
    'Food',
    'Finance',
    'Bills',
    'Shopping',
    'Health',
    'Entertainment',
    'Education & Career',
    'Gifts',
    'Investment',
    'Transport',
    'Vehicle',
    'Housing',
    'Internet & Mobile',
    'Other'
  );
