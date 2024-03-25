import { discord, lucia } from '@server/auth';
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
  accent_color: number;
  global_name: string;
  avatar_decoration_data: any | null; // You might want to replace `any` with a more specific type if possible
  banner_color: string;
  mfa_enabled: boolean;
  locale: string;
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

  try {
    const tokens = await discord.validateAuthorizationCode(code);
    const discordUserResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const discordUser = (await discordUserResponse.json()) as DiscordUser;

    // Replace this with your own DB client.
    // const existingUser = await db.table("user").where("github_id", "=", githubUser.id).get();
    const existingUser = await db.select().from(User).where(eq(User.discord_id, discordUser.id)).get();

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

      if (
        discordUser.global_name !== existingUser.name ||
        discordUser.avatar !== existingUser.avatar ||
        discordUser.accent_color !== parseInt(existingUser.accent_color.slice(1), 16)
      ) {
        await db
          .update(User)
          .set({
            name: discordUser.global_name,
            avatar: discordUser.avatar,
            accent_color: '#' + discordUser.accent_color.toString(16).padStart(6, '0')
          })
          .where(eq(User.id, existingUser.id));
      }

      return context.redirect('/');
    }

    const userId = generateId(15);

    const avatarUrl = discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp`
      : `https://cdn.discordapp.com/embed/avatars/${Number(discordUser.discriminator) % 5}.png`;

    await db.insert(User).values({
      id: userId,
      discord_id: discordUser.id,
      username: discordUser.username,
      avatar: avatarUrl,
      accent_color: '#' + discordUser.accent_color.toString(16).padStart(6, '0'),
      name: discordUser.global_name
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return context.redirect('/');
  } catch (e) {
    // the specific error message depends on the provider
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
