import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido"
    }),
    username: z.string({
        required_error: "El usuario es requerido"
    }),
    email: z.string({
        required_error: "El correo es requerido"
    }),
    password: z.string({
        required_error: "La contraseña es requerida"
    })
        .min(12, {
            message: "La contraseña debe tener como mínimo 12 caracteres"
        }),
    telephone: z
        .string({
            required_error: "Teléfono es requerido",
        })
        .min(8, {
            message: "El teléfono debe tener como mínimo 8 dígitos",
        })
        .regex(/^\d+$/, {
            message: "El teléfono debe contener solo números",
        }),
    age: z
        .string({
            required_error: "Edad es requerida",
        })
        .transform((val) => Number(val))
        .refine((num) => !isNaN(num), { message: "Edad debe ser un número válido" })
        .refine((num) => num >= 18, { message: "Debe ser mayor de edad" }),
});

export const loginSchema = z.object({
    username: z.string({
        required_error: "Contactar con el administrador"
    }),
    password: z.string({
        required_error: "Contactar con el administrador"
    })
});