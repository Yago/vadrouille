import { defineCollection, z } from 'astro:content';

const seasons = ['Été', 'Automne', 'Hiver', 'Printemps'] as const;
const categories = ['Nature', 'Histoire'] as const;
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
    excerpt: z.string(),
    publishDate: z.date(),
    seasons: z.array(z.enum(seasons)),
    categories: z.array(z.enum(categories)),
    location: z.string(),
    canton: z.enum(cantons),
    coordinates: z.tuple([z.number(), z.number()]),
    gpx: z.string(),
    geojson: z.string(),
    images: z.array(z.string()),
    duration: z.string(),
    difficulty: z.enum(difficulties),
    elevation: z.tuple([z.number(), z.number()]),
  }),
});

export const collections = {
  balades: baladesCollection,
};