export interface SocketGameInviteMessage {
   type: "game_invite";
   from_user_id: number;
   from_user_name: string;
   message: string;
}

export interface SocketRoomJoinedMessage {
   type: "room_joined";
   room_id: string | number;
   you_are: "player_1" | "player_2";
   opponent: string;
}
