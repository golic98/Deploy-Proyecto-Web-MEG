import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string({
        required_error: "El titulo es requerido"
    }),
    description: z.string({
        required_error: "La descripcion es requerida"
    }),
    date: z.string().datetime().optional(),
});

export const createTaskSchema2 = z.object({
    title2: z.string({
        required_error: "El titulo es requerido"
    }),
    description2: z.string({
        required_error: "La descripcion es requerida"
    }),
    date: z.string().datetime().optional(),
});