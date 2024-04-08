import { POST_REACTION_EMOTES } from '@/lib/configs';
import { getEntry } from 'astro:content';
import { ShowcasePostReaction, db, isDbError } from 'astro:db';

export function error(status: number = 400, statusText: string = 'Bad Request'): Response {
  return new Response(null, {
    status: status,
    statusText: statusText
  });
}

export function json(data: unknown, options: ResponseInit = {}): Response {
  let body: string | null = null;

  try {
    body = JSON.stringify(data);
    if (!options.status) {
      options.status = 200;
    }
    if (!options.headers) {
      options.headers = {} as Record<string, string>;
    }
    // @ts-expect-error
    options.headers['Content-Type'] = 'application/json';
    // @ts-expect-error
    options.headers['Content-Length'] = body.length.toString();
  } catch (error) {
    console.error(error);
    options.status = 500;
    options.statusText = 'Internal Server Error';
  }

  return new Response(body, options);
}

export async function handleCommunityProjectReaction(request: Request, locals: App.Locals): Promise<ResponseInit> {
  if (!locals.user) {
    return {
      status: 401,
      statusText: 'Unauthorized'
    };
  }

  const contentType = request.headers.get('Content-Type');
  let project_slug: unknown, reaction: unknown;

  try {
    if (contentType === 'application/json') {
      const payload = await request.json();
      project_slug = payload.slug;
      reaction = payload.reaction;
    } else if (contentType === 'application/x-www-form-urlencoded') {
      const formData = await request.formData();
      project_slug = formData.get('slug');
      reaction = formData.get('reaction');
    } else {
      return {
        status: 400,
        statusText: 'Bad Request - JSON body is invalid'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      statusText: 'Bad Request - JSON body is invalid'
    };
  }

  if (typeof project_slug !== 'string' || typeof reaction !== 'string' || !POST_REACTION_EMOTES.has(reaction)) {
    return {
      status: 400,
      statusText: 'Bad Request - Invalid id or reaction'
    };
  }

  const project = await getEntry('showcase', project_slug);
  if (!project) {
    return {
      status: 404,
      statusText: 'Not Found'
    };
  }

  try {
    await db
      .insert(ShowcasePostReaction)
      .values({
        postId: project.id,
        userId: locals.user.id,
        reaction: reaction
      })
      .onConflictDoUpdate({
        target: [ShowcasePostReaction.postId, ShowcasePostReaction.userId],
        set: {
          reaction: reaction
        }
      });
  } catch (error) {
    if (isDbError(error) && error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
      // TODO: Return a more specific error message
    }

    console.error(error);

    return {
      status: 500,
      statusText: 'Internal Server Error'
    };
  }

  return {
    status: 200
  };
}
