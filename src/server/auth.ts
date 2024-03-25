import { Discord } from 'arctic';
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
      avatar: attributes.avatar
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
  `http://localhost:4321/api/v1/oauth/discord/callback`
);
