import { DISCORD_INVITE_LINK } from '@configs/discord_sv';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ redirect }) => {
  return redirect(DISCORD_INVITE_LINK);
};
