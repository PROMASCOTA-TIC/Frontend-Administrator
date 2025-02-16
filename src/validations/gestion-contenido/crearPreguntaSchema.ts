import { z } from 'zod';

export const crearPreguntaSchema = z.object({
    category: z
        .string()
        .min(1, { message: 'La categoría es obligatoria', }),
    title: z
        .string()
        .min(1, { message: 'El título es obligatorio', }),
    description: z
        .string()
        .min(1, { message: 'La descripción es obligatoria', }),
})