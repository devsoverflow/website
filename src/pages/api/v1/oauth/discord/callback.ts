import { discord, extract_redirect_to_cookie, lucia } from '@/lib/server/auth';
import { OAuth2RequestError } from 'arctic';
import type { APIContext } from 'astro';
import { User, db, eq } from 'astro:db';
import { generateId } from 'lucia';

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  premium_type: number;
  flags: number;
  banner: string | null;
  accent_color: number | null;
  global_name: string;
  avatar_decoration_data: any | null;
  banner_color: string;
  mfa_enabled: boolean;
  locale: string;
}

interface CustomDiscordUser extends DiscordUser {
  avatarUrl: string;
  accentColor: string;
}

function parseDiscordUser(user: DiscordUser): CustomDiscordUser {
  return {
    ...user,
    avatarUrl: user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`
      : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`,
    accentColor: '#' + (user.accent_color?.toString(16).padStart(6, '0') ?? 'e64c4c')
  };
}

export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get('code');
  const state = context.url.searchParams.get('state');
  const storedState = context.cookies.get('discord_oauth_state')?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  const redirect_to = extract_redirect_to_cookie(context) ?? '/';

  try {
    const tokens = await discord.validateAuthorizationCode(code);
    const discordUserResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });

    const discordUser = parseDiscordUser(await discordUserResponse.json());
    const dbUser = await db.select().from(User).where(eq(User.discordId, discordUser.id)).get();

    if (dbUser) {
      const session = await lucia.createSession(dbUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

      if (
        discordUser.global_name !== dbUser.name ||
        discordUser.avatarUrl !== dbUser.avatar ||
        discordUser.accentColor !== dbUser.accentColor
      ) {
        await db
          .update(User)
          .set({
            name: discordUser.global_name,
            avatar: discordUser.avatarUrl,
            accentColor: discordUser.accentColor
          })
          .where(eq(User.id, dbUser.id));
      }

      return context.redirect(redirect_to);
    }

    const userId = generateId(15);

    await db.insert(User).values({
      id: userId,
      discordId: discordUser.id,
      username: discordUser.username,
      avatar: discordUser.avatarUrl,
      accentColor: discordUser.accentColor,
      name: discordUser.global_name
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return context.redirect(redirect_to);
  } catch (e) {
    console.log('Error handling Discord OAuth callback:', e);
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      });
    }

    return new Response(null, {
      status: 500
    });
  }
}
