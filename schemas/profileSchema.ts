import * as z from "zod";

// =========================================================================
export const ProfileFormSchema = z.object({
  username: z.string().min(3, { message: "Username minimal 3 karakter." }),
  email: z.string().email({ message: "Email tidak valid." }),
  contact: z.string().optional().nullable(),

  // NEW FIELD: Password (Opsional, tapi jika diisi harus minimal 6 karakter)
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Password baru minimal 6 karakter.",
    }),

  // Field display yang tidak di-update (dibiarkan opsional agar form.reset() mudah)
  employeeId: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;
