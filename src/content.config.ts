import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Coleção de Projetos
const projetosCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projetos" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    coverImage: image().optional(),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    category: z.array(z.enum(['Web', 'RPA', 'Dados'])),
    gallery: z.array(image()).optional(),
  }),
});

// Coleção de Seções da Página (Hero, Sobre, Contato)
const secoesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/secoes" }),
  schema: z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    buttonText: z.string().optional(),
  }),
});

export const collections = {
  'projetos': projetosCollection,
  'secoes': secoesCollection,
};
