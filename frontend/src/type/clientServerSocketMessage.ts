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

export type ClientSocketMessage =
   | SocketAcceptGameInviteMessage
   | SocketKeyEventMessage
   | SocketSendGameInviteMessage;
