import { lucia } from '@/lib/server/auth';
import type { APIContext } from 'astro';

export async function POST(context: APIContext): Promise<Response> {
  if (!context.locals.session) {
    return context.redirect('/');
  }

  await lucia.invalidateSession(context.locals.session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return context.redirect('/login');
}
