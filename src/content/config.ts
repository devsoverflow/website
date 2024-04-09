import { defineCollection, z } from 'astro:content';

const showcaseCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    description: z.string(),
    author: z.string(),
    author_url: z.string().url().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    language: z.enum(['en', 'es']),
    tags: z.array(z.string()),
    links: z
      .object({
        repository: z.string().url().optional(),
        website: z.string().url().optional()
      })
      .optional()
  })
});

export const collections = {
  showcase: showcaseCollection
};
