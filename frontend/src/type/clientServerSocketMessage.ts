import type { User } from "../schemas/user";

export interface SocketJoinLobbyMessage {
   type: "join_lobby";
   user: User;
}

export interface SocketAcceptGameInviteMessage {
   type: "accept_game_invite";
   fromUserId: string;
   toUserId: string;
}

export interface SocketKeyEventMessage {
   type: "key_event";
   key: string;
   room_id: string;
   user_id: string;
   pressed: boolean;
}

export interface SocketSendGameInviteMessage {
   type: "send_game_invite";
   fromUserId: string;
   toUserId: string;
}

export interface SocketLeaveRoomMessage {
   type: "leave_room";
   userId: string;
}

export type ClientSocketMessage =
   | SocketJoinLobbyMessage
   | SocketAcceptGameInviteMessage
   | SocketKeyEventMessage
   | SocketSendGameInviteMessage
   | SocketLeaveRoomMessage;
