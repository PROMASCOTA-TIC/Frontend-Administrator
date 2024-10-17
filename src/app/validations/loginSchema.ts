import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .email({ message: 'Ingresa un correo válido', }),
    password: z
        .string()
})