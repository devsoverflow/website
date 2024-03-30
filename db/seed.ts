import { prog_langs } from '@/configs/prog_langs';
import { ProgrammingLanguage, db } from 'astro:db';

/**
 * Function to seed the database.
 *
 * @see https://astro.build/db/seed
 *
 * You can author a .ts file with the astro:db module to write type-safe queries.
 * Then, execute the file against your Studio database using the command:
 * ```bash
 * astro db execute <file-path> --remote
 * ```
 *
 * In this case:
 * ```bash
 * astro db execute db/seed.ts --remote
 * ```
 */
export default async function () {
  await db.insert(ProgrammingLanguage).values(prog_langs);
}
