import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    name: z
      .string()
      .trim()
      .nonempty("Name cannot be empty")
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name is too long"),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword.length < 6) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Confirm Password is required",
      });
    }

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });

// export const registerSchema = rawRegisterSchema.refine(
//   (data) => data.password === data.confirmPassword,
//   {
//     path: ["confirmPassword"],
//     message: "Passwords do not match",
//   }
// );

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
