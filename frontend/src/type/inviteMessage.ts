export interface GameInviteMessage {
   message: string;
   fromUserId: number;
   fromUserName: string;
   isClosed: boolean;
   receivedAt: number;
}
