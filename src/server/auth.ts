import { DEPLOY_URL } from '@/configs/index';
import { Discord } from 'arctic';
import type { APIContext } from 'astro';
import { db, Session, User } from 'astro:db';
import { Lucia } from 'lucia';
import { AstroDBAdapter } from 'lucia-adapter-astrodb';

const adapter = new AstroDBAdapter(db, Session, User);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD
    }
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      discordId: attributes.discord_id,
      username: attributes.username,
      name: attributes.name,
      accentColor: attributes.accent_color,
      avatar: attributes.avatar,
      logosClicked: attributes.logos_clicked
    };
  }
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: typeof User.$inferSelect;
  }
}

export const discord = new Discord(
  import.meta.env.DISCORD_CLIENT_ID,
  import.meta.env.DISCORD_CLIENT_SECRET,
  `${DEPLOY_URL}/api/v1/oauth/discord/callback`
);

export function set_redirect_to_cookie(context: APIContext): void {
  const raw_redirect = context.url.searchParams.get('redirect_to');
  if (!raw_redirect) {
    return;
  }

  const redirect_to = '/' + raw_redirect.trim().slice(1);
  context.cookies.set('redirect_to', redirect_to, {
    path: '/',
    secure: import.meta.env.PROD,
    httpOnly: true,
    sameSite: 'lax'
  });
}

export function extract_redirect_to_cookie(context: APIContext): string | undefined {
  const raw_redirect = context.cookies.get('redirect_to')?.value;
  if (!raw_redirect) {
    return;
  }

  context.cookies.delete('redirect_to', { path: '/' });
  const redirect_to = '/' + raw_redirect.trim().slice(1);
  return redirect_to;
}
