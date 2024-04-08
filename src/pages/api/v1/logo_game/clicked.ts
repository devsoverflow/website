import { error, json } from '@/lib/server/api';
import type { APIContext } from 'astro';
import { User, UserProgrammingLanguage, db, eq, isDbError, sql } from 'astro:db';

export async function POST({ locals, url }: APIContext) {
  if (!locals.user) {
    return error(401, 'Unauthorized');
  }

  const logo_id = url.searchParams.get('id');
  if (!logo_id || typeof logo_id !== 'string') {
    return error(400, 'Bad Request - Invalid id');
  }

  let inserted: typeof UserProgrammingLanguage.$inferSelect;
  let general_count: number;
  try {
    [, inserted] = await Promise.all([
      db
        .update(User)
        .set({
          logosClicked: locals.user.logosClicked + 1
        })
        .where(eq(User.id, locals.user.id)),
      db
        .insert(UserProgrammingLanguage)
        .values({
          userId: locals.user.id,
          programmingLanguageId: logo_id
        })
        .onConflictDoUpdate({
          target: [UserProgrammingLanguage.userId, UserProgrammingLanguage.programmingLanguageId],
          set: {
            count: sql<number>`${UserProgrammingLanguage.count} + 1`
          }
        })
        .returning()
        .get()
    ]);

    general_count =
      (
        await db
          .select({
            count: sql<number>`SUM(${UserProgrammingLanguage.count})`
          })
          .from(UserProgrammingLanguage)
          .get()
      )?.count || inserted.count;
  } catch (exc) {
    if (isDbError(exc) && exc.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
      // return new Response(null, {
      //   status: 200,
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
    }

    console.error(exc);

    return error(500, 'Internal Server Error');
  }

  const payload = {
    id: inserted.programmingLanguageId,
    count: inserted.count,
    general_count: general_count
  };

  return json(payload);
}
