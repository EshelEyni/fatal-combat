import { z } from "zod";
import { UserSchema } from "../user";

export const SocketGameInviteMessageSchema = z.object({
   type: z.literal("game_invite"),
   from_user_id: z.number(),
   from_user_name: z.string(),
   message: z.string(),
});

export const SocketRoomJoinedMessageSchema = z.object({
   type: z.literal("room_joined"),
   room_id: z.number(),
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

export const ServerSocketMessageSchema = z.union([
   SocketGameInviteMessageSchema,
   SocketRoomJoinedMessageSchema,
   SocketLobbyUsersMessageSchema,
   SocketUserJoinedLobbyMessageSchema,
   SocketUserLeftLobbyMessageSchema,
]);

export type SocketGameInviteMessage = z.infer<typeof SocketGameInviteMessageSchema>;
export type SocketRoomJoinedMessage = z.infer<typeof SocketRoomJoinedMessageSchema>;
export type SocketLobbyUsersMessage = z.infer<typeof SocketLobbyUsersMessageSchema>;
export type SocketUserJoinedLobbyMessage = z.infer<typeof SocketUserJoinedLobbyMessageSchema>;
export type SocketUserLeftLobbyMessage = z.infer<typeof SocketUserLeftLobbyMessageSchema>;

export type ServerSocketMessage = z.infer<typeof ServerSocketMessageSchema>;
