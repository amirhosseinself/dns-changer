import { z } from "zod";

// Register Schema
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(1, "Full name is required"),
});

// Login Schema
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
