import { defineStore } from "pinia";

export const useInviteMessageStore = defineStore("inviteMessage", {
   state: () => ({
      inviteMessages: [] as any[],
      roomDetails: null as any,
   }),
   getters: {},
   actions: {
      socketEventHandler(msg: any,loggedInUserId?: string) {
         if (msg.type === "game_invite") {
            this.inviteMessages.push({ ...msg, receivedAt: new Date(), isClosed: false });
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
   },
});
