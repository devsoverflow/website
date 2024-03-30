import { DISCORD_INVITE_LINK } from '@/configs/index';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ redirect }) => {
  return redirect(DISCORD_INVITE_LINK);
};
