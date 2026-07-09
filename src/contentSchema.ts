import { z } from 'zod';
import { axes, challenges, characteristics } from './content';

const localizedTextSchema = z.object({
  es: z.string().min(1),
  pt: z.string().optional(),
});

export const contentSchema = z.object({
  characteristics: z.array(
    z.object({
      id: z.string().min(1),
      category: z.enum(['empuje', 'relacion', 'ejecucion']),
      weight: z.number().int().positive(),
      name: localizedTextSchema,
      faceA: localizedTextSchema,
      faceB: localizedTextSchema,
      shadowId: z.string().min(1),
    }),
  ),
  axes: z.array(
    z.object({
      id: z.string().min(1),
      label: localizedTextSchema,
      options: z.array(
        z.object({
          id: z.string().min(1),
          text: localizedTextSchema,
          cost: z.number().int().positive(),
          isTrap: z.boolean(),
          trapExplain: localizedTextSchema.optional(),
        }),
      ),
    }),
  ),
  challenges: z.array(
    z.object({
      id: z.string().min(1),
      targetShadow: z.string().min(1),
      targetAxis: z.string().min(1),
      title: localizedTextSchema,
      scene: localizedTextSchema,
      excuse: localizedTextSchema,
    }),
  ),
});

export function validateContent() {
  return contentSchema.parse({ characteristics, axes, challenges });
}
