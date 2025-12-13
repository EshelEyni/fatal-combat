import { z } from "zod";

export const UserSchema = z.object({
   id: z.number(),
   username: z.string(),
   password: z.string(),
   role: z.union([z.literal(1), z.literal(2)]),
});

export type User = z.infer<typeof UserSchema>;
