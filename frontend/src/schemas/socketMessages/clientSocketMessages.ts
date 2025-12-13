import { z } from "zod";
import { UserSchema } from "../user";
import { Player1KeySchema, Player2KeySchema } from "../keys";

const SocketJoinLobbyMessageSchema = z.object({
   type: z.literal("join_lobby"),
   user: UserSchema,
});

const SocketAcceptGameInviteMessageSchema = z.object({
   type: z.literal("accept_game_invite"),
   fromUserId: z.number(),
   toUserId: z.number(),
});

const SocketKeyEventMessageSchema = z.object({
   type: z.literal("key_event"),
   key: z.union([Player1KeySchema, Player2KeySchema]),
   room_id: z.string(),
   user_id: z.number(),
   pressed: z.boolean(),
});

const SocketSendGameInviteMessageSchema = z.object({
   type: z.literal("send_game_invite"),
   fromUserId: z.number(),
   toUserId: z.number(),
});

const SocketLeaveRoomMessageSchema = z.object({
   type: z.literal("leave_room"),
   userId: z.number(),
});

export const ClientSocketMessageSchema = z.union([
   SocketJoinLobbyMessageSchema,
   SocketAcceptGameInviteMessageSchema,
   SocketKeyEventMessageSchema,
   SocketSendGameInviteMessageSchema,
   SocketLeaveRoomMessageSchema,
]);

export type ClientSocketMessage = z.infer<typeof ClientSocketMessageSchema>;
