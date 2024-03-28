import type { APIContext } from 'astro';
import { User, UserProgrammingLanguage, db, eq, isDbError } from 'astro:db';

export async function POST({ locals, request }: APIContext) {
  if (!locals.user) {
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized'
    });
  }

  const logo_id = new URL(request.url).searchParams.get('id');
  if (!logo_id || typeof logo_id !== 'string') {
    return new Response(null, {
      status: 400,
      statusText: 'Bad Request'
    });
  }

  try {
    await db
      .update(User)
      .set({
        logos_clicked: locals.user.logosClicked + 1
      })
      .where(eq(User.id, locals.user.id));

    await db
      .insert(UserProgrammingLanguage)
      .values({
        userId: locals.user.id,
        programmingLanguageId: logo_id
      })
      .onConflictDoNothing();
  } catch (error) {
    if (isDbError(error) && error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
      return new Response(null, {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    console.error(error);

    return new Response(null, {
      status: 500,
      statusText: 'Internal Server Error'
    });
  }

  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
