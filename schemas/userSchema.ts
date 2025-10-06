// src/schemas/userSchema.ts

import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string().min(1, { message: "Username minimal 1 karakter." }),
  email: z.email({ message: "Email tidak valid." }),
  role: z.enum(["mechanic", "leader", "admin"]),
  contact: z.string().optional().nullable(),
  employeeId: z.string().min(1, { message: "Employee ID minimal 1 karakter." }),
  department: z.string().optional().nullable(),
  createdAt: z.string(),
});

export const createUserSchema = userSchema
  .omit({ id: true, createdAt: true })
  .extend({
    password: z.string().min(6, "Password minimal 6 karakter."),
  });

export const updateUserSchema = createUserSchema.partial();

export type User = z.infer<typeof userSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
