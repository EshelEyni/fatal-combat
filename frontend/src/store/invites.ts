import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";

export const useInviteMessageStore = defineStore("inviteMessage", {
   state: () => ({
      inviteMessages: [] as any[],
   }),
   getters: {},
   actions: {
      socketEventHandler(msg: any, toast: ReturnType<typeof useToast>) {
         if (msg.type === "game_invite") {
            this.inviteMessages.push(msg);
            console.log(msg);

            toast.add({
               severity: "success",
               summary: "Game Invite",
               detail: `New game invite from ${msg.from_user_name}`,
               life: 90000,
            });
         }
      },
   },
});
