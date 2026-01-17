import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .email("email is not valid")
    .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "email is not valid"),
  name: z
    .string({ error: "user's name is required" })
    .min(2, "user's name must be at least 2 characters")
    .max(50, "user's name can contain up to 50 characters")
    .regex(
      /^[\u0590-\u05FFA-Z](?:[\u0590-\u05FF a-z]*[\u0590-\u05FFa-z])?$/,
      "user's name can only contain Hebrew and English letters"
    ),
  password: z
    .string({ error: "password is required" })
    .min(8, "password must be at least 8 characters")
    .max(50, "password can contain up to 50 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,50}$/,
      "password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
});
export type RegisterValidation = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .email("email is not valid")
    .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "email is not valid"),
  password: z
    .string({ error: "password is required" })
    .min(8, "password must be at least 8 characters")
    .max(50, "password can contain up to 50 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,50}$/,
      "password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
});
export type LoginValidation = z.infer<typeof loginSchema>;
