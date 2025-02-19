import { z } from "zod";

export const UpdateUserVal = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    name: z.string().min(1, "Name is required"),
    currentPassword: z.string(),
    newPassword: z.string(),
    oldPass: z.optional(z.string()),
  })
  .refine((data) => data.currentPassword === data.oldPass, {
    path: ["currentPassword"],
    message: "Password do not match",
  });
