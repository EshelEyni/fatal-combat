import { defineStore } from "pinia";
import type { GameInviteMessage } from "../type/inviteMessage";
import type { SocketGameInviteMessage, SocketRoomJoinedMessage } from "../type/socketMessage";

export const useInviteMessageStore = defineStore("inviteMessage", {
   state: () => ({
      inviteMessages: [] as GameInviteMessage[],
      roomDetails: null as any,
   }),
   getters: {
      openInviteMessages(state): GameInviteMessage[] {
         return state.inviteMessages.filter(invite => !invite.isClosed);
      },
   },
   actions: {
      socketEventHandler(
         msg: SocketGameInviteMessage | SocketRoomJoinedMessage,
         loggedInUserId?: string,
      ) {
         if (msg.type === "game_invite") {
            this.addInviteMessage(msg);
         }
         if (msg.type === "room_joined") {
            this.roomDetails = {
               roomId: msg.room_id,
               fighter: msg.you_are,
               opponentName: msg.opponent,
               userId: loggedInUserId,
            };
         }
      },
      addInviteMessage(msg: SocketGameInviteMessage) {
         const formattedInvite: GameInviteMessage = {
            message: msg.message,
            fromUserId: msg.from_user_id,
            fromUserName: msg.from_user_name,
            receivedAt: Date.now(),
            isClosed: false,
         };

         this.inviteMessages.push(formattedInvite);
      },
      removeInviteMessage(invite: GameInviteMessage) {
         this.inviteMessages = this.inviteMessages.filter(
            inv => inv.fromUserId !== invite.fromUserId,
         );
      },
      closeInviteMessage(invite: GameInviteMessage) {
         this.inviteMessages = this.inviteMessages.map(inv => {
            if (inv.fromUserId === invite.fromUserId) {
               return { ...inv, isClosed: true };
            }
            return inv;
         });
      },
   },
});
