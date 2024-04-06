import { discord, set_redirect_to_cookie } from '@/lib/server/auth';
import { generateState } from 'arctic';
import type { APIContext } from 'astro';

export async function GET(context: APIContext): Promise<Response> {
  const state = generateState();

  const url = await discord.createAuthorizationURL(state, {
    scopes: ['identify', 'guilds']
  });
  context.cookies.set('discord_oauth_state', state, {
    path: '/',
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax'
  });

  set_redirect_to_cookie(context);

  return context.redirect(url.toString());
}
