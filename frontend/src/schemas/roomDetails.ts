import { z } from "zod";

export const RoomDetailsSchema = z.object({
   roomId: z.string(),
   fighter: z.union([z.literal("player_1"), z.literal("player_2")]),
   opponentName: z.string(),
   userId: z.number(),
   accepterId: z.number(),
   inviterId: z.number(),
});

export type RoomDetails = z.infer<typeof RoomDetailsSchema>;
