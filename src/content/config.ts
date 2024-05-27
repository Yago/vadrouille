import { defineCollection, z } from 'astro:content';

export const seasons = ['Été', 'Automne', 'Hiver', 'Printemps'] as const;
export const categories = ['Nature', 'Histoire'] as const;
export const difficulties = ['Facile', 'Modérée', 'Difficile'] as const;
export const cantons = [
  'Appenzell Rh.-Ext.',
  'Appenzell Rh.-Int.',
  'Argovie',
  'Berne',
  'Bâle-Campagne',
  'Bâle-Ville',
  'Fribourg',
  'Genève',
  'Glaris',
  'Grisons',
  'Jura',
  'Lucerne',
  'Neuchâtel',
  'Nidwald',
  'Obwald',
  'Saint-Gall',
  'Schaffhouse',
  'Schwyz',
  'Soleure',
  'Tessin',
  'Thurgovie',
  'Uri',
  'Valais',
  'Vaud',
  'Zoug',
  'Zurich',
] as const;

const baladesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    cover: z.string(),
    excerpt: z.string(),
    publishDate: z.date(),
    seasons: z.array(z.enum(seasons)),
    category: z.enum(categories),
    location: z.string(),
    canton: z.enum(cantons),
    coordinates: z.tuple([z.number(), z.number()]),
    gpx: z.string(),
    geojson: z.string(),
    gallery: z.array(
      z.object({
        src: z.string(),
        caption: z.optional(z.string()),
      })
    ),
    duration: z.number(),
    distance: z.number(),
    difficulty: z.enum(difficulties),
    elevation: z.tuple([z.number(), z.number()]),
    map: z.object({
      center: z.tuple([z.number(), z.number()]),
      zoom: z.number(),
      bearing: z.number(),
      pitch: z.number(),
    }),
  }),
});

export const collections = {
  balades: baladesCollection,
};
