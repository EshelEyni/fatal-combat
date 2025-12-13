import { z } from "zod";

export const AuthInputSchema = z.object({
   username: z.string().min(1, "Username required"),
   password: z.string().min(4, "Password must be at least 4 characters"),
});

export type AuthInput = z.infer<typeof AuthInputSchema>;
