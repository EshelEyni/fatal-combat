export interface GameInviteMessage {
   message: string;
   fromUserId: string;
   fromUserName: string;
   isClosed: boolean;
   receivedAt: number;
}
