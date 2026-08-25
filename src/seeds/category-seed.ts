import { db } from '#/configs/db.js';
import { logger } from '#/configs/logger.js';

const categories = [
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
  'Other',
];

async function seedCategories(): Promise<void> {
  logger.info('Seeding categories...');

  const q = `
    INSERT INTO categories (name)
    SELECT category_name
    FROM unnest($1::text[]) AS category_name
    WHERE NOT EXISTS (
      SELECT 1
      FROM categories
      WHERE categories.name = category_name
    )
  `;

  const result = await db.query(q, [categories]);
  logger.info(`Categories seeded. Inserted ${result.rowCount} rows.`);
}

try {
  await seedCategories();
} catch (err) {
  logger.error({ error: err }, 'Failed to seed categories');
} finally {
  await db.end();
}
