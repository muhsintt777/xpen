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
  ) AS category_name
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      categories
    WHERE
      categories.name = category_name
  );
