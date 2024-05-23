import { z } from "zod";

const schema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name should have 2 letters at least")
      .max(20),
    lastName: z
      .string()
      .min(2, "Last name should have 2 letters at least")
      .max(20),
    nationalId: z.string().min(5).max(8),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export default schema