import { defineCollection, z } from 'astro:content';

const seasons = ['Été', 'Automne', 'Hiver', 'Printemps'] as const;
export const categories = z.enum(['Nature', 'Histoire']);
const difficulties = ['Facile', 'Modérée', 'Difficile'] as const;
const cantons = [
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
  schema: z.object({
    title: z.string(),
    cover: z.string(),
    excerpt: z.string(),
    publishDate: z.date(),
    seasons: z.array(z.enum(seasons)),
    category: categories,
    location: z.string(),
    canton: z.enum(cantons),
    coordinates: z.tuple([z.number(), z.number()]),
    gpx: z.string(),
    geojson: z.string(),
    gallery: z.array(
      z.object({
        src: z.string(),
        caption: z.optional(z.string()),
        width: z.number(),
        height: z.number(),
      })
    ),
    duration: z.string(),
    distance: z.string(),
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
