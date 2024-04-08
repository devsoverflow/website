import { error, json } from '@/lib/server/api.js';
import type { APIContext } from 'astro';
import { UserProgrammingLanguage, db, sql } from 'astro:db';

export async function GET({ locals }: APIContext) {
  if (!locals.user) {
    return error(401, 'Unauthorized');
  }

  let counts: { id: string; count: number }[];
  try {
    counts = await db
      .select({
        id: UserProgrammingLanguage.programmingLanguageId,
        count: sql<number>`SUM(${UserProgrammingLanguage.count})`
      })
      .from(UserProgrammingLanguage)
      .groupBy(UserProgrammingLanguage.programmingLanguageId);
  } catch (exc) {
    console.error(exc);
    return error(500, 'Internal Server Error');
  }

  const payload: { total: number; counts: Record<string, number> } = { total: 0, counts: {} };
  for (const row of counts) {
    payload.total += row.count;
    payload.counts[row.id] = row.count;
  }

  return json(payload);
}
