import { db } from '@/configs/db.js';
import { ConsoleUtils } from '@/utils/console-utils.js';

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
  ConsoleUtils.logInfo('Seeding categories...');

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
  ConsoleUtils.logSuccess(
    `Categories seeded. Inserted ${result.rowCount} rows.`,
  );
}

try {
  await seedCategories();
} catch (err) {
  ConsoleUtils.logError('Failed to seed categories');
} finally {
  await db.end();
}

// todo: add validation middleware to all req
