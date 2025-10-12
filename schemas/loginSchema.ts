import z from "zod";

export const loginSchema = z.object({
  // email: z.string().email("Invalid email address"),
  nrp: z.string(),
  password: z.string().min(1),
});

export type LoginSchema = z.infer<typeof loginSchema>;
