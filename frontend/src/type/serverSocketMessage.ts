import type { User } from "./user";

export interface SocketGameInviteMessage {
   type: "game_invite";
   from_user_id: number;
   from_user_name: string;
   message: string;
}

export interface SocketRoomJoinedMessage {
   type: "room_joined";
   room_id: string;
   you_are: "player_1" | "player_2";
   opponent: string;
}

export interface SocketLobbyUsersMessage {
   type: "lobby_users";
   users: User[];
}

export interface SocketUserJoinedLobbyMessage {
   type: "user_joined_lobby";
   user: User;
}

export interface SocketUserLeftLobbyMessage {
   type: "user_left_lobby";
   user: User;
}

export type ServerSocketMessage =
   | SocketGameInviteMessage
   | SocketRoomJoinedMessage
   | SocketLobbyUsersMessage
   | SocketUserJoinedLobbyMessage
   | SocketUserLeftLobbyMessage;
