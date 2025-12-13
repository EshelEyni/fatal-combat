import { z } from "zod";
import { UserSchema } from "../user";
import { Player1KeySchema, Player2KeySchema } from "../keys";

export const SocketGameInviteMessageSchema = z.object({
   type: z.literal("game_invite"),
   from_user_id: z.number(),
   from_user_name: z.string(),
   message: z.string(),
});

export const SocketRoomJoinedMessageSchema = z.object({
   type: z.literal("room_joined"),
   room_id: z.string(),
   you_are: z.union([z.literal("player_1"), z.literal("player_2")]),
   opponent: z.string(),
   accepter_id: z.number(),
   inviter_id: z.number(),
});

export const SocketLobbyUsersMessageSchema = z.object({
   type: z.literal("lobby_users"),
   users: z.array(UserSchema),
});

export const SocketUserJoinedLobbyMessageSchema = z.object({
   type: z.literal("user_joined_lobby"),
   user: UserSchema,
});

export const SocketUserLeftLobbyMessageSchema = z.object({
   type: z.literal("user_left_lobby"),
   user: UserSchema,
});

export const SocketOpponentKeyEventMessageSchema = z.object({
   type: z.literal("opponent_key_event"),
   key: z.union([Player1KeySchema, Player2KeySchema]),
   pressed: z.boolean(),
});

export const ServerSocketMessageSchema = z.union([
   SocketGameInviteMessageSchema,
   SocketRoomJoinedMessageSchema,
   SocketLobbyUsersMessageSchema,
   SocketUserJoinedLobbyMessageSchema,
   SocketUserLeftLobbyMessageSchema,
   SocketOpponentKeyEventMessageSchema,
]);

export type SocketGameInviteMessage = z.infer<typeof SocketGameInviteMessageSchema>;
export type SocketRoomJoinedMessage = z.infer<typeof SocketRoomJoinedMessageSchema>;
export type SocketLobbyUsersMessage = z.infer<typeof SocketLobbyUsersMessageSchema>;
export type SocketUserJoinedLobbyMessage = z.infer<typeof SocketUserJoinedLobbyMessageSchema>;
export type SocketUserLeftLobbyMessage = z.infer<typeof SocketUserLeftLobbyMessageSchema>;
export type SocketOpponentKeyEventMessage = z.infer<typeof SocketOpponentKeyEventMessageSchema>;

export type ServerSocketMessage = z.infer<typeof ServerSocketMessageSchema>;
