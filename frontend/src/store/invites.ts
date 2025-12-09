import { defineStore } from "pinia";

export const useInviteMessageStore = defineStore("inviteMessage", {
   state: () => ({
      inviteMessages: [] as any[],
   }),
   getters: {},
   actions: {
      socketEventHandler(msg: any) {
         if (msg.type === "game_invite") {
            this.inviteMessages.push({ ...msg, receivedAt: new Date(), isClosed: false });
         }
      },
   },
});
