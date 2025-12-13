import { z } from "zod";

export const GameInviteMessageSchema = z.object({
   message: z.string(),
   fromUserId: z.number(),
   fromUserName: z.string(),
   isClosed: z.boolean(),
   receivedAt: z.number(),
});

export type GameInviteMessage = z.infer<typeof GameInviteMessageSchema>;
