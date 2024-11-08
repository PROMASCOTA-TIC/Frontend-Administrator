import { z } from 'zod';

export const transferSchema = z.object({
    comment: z
        .string()
        .min(1, { message: 'El comentario es requerido.' }),
});
