import { defineStore } from "pinia";
import type { User } from "../type/user";
import { useWebSocketStore } from "./websocket";

export const useOnlineUsersStore = defineStore("onlineUsers", {
   state: () => ({
      onlineUsers: [] as User[],
   }),
   getters: {
      onlineCount: state => state.onlineUsers.length,

      uniqueUsers: state => {
         const map = new Map();
         state.onlineUsers.forEach(u => map.set(u.id, u));
         return [...map.values()];
      },

      // example: find specific user
      getUserById: state => (id: string) => {
         return state.onlineUsers.find(u => u.id === id);
      },
   },
   actions: {
      initListeners() {
         const ws = useWebSocketStore();

         ws.subscribe((msg: any) => {
            if (msg.type === "lobby_users") {
               this.onlineUsers = msg.users;
            }
            if (msg.type === "lobby_user_joined") {
               this.onlineUsers.push(msg.user);
            }
            if (msg.type === "lobby_user_left") {
               this.onlineUsers = this.onlineUsers.filter(u => u.id !== msg.user.id);
            }
         });
      },
      setOnlineUsers(list: User[]) {
         this.onlineUsers = list;
      },

      addOnlineUser(user: User) {
         if (!this.onlineUsers.find(u => u.id === user.id)) {
            this.onlineUsers.push(user);
         }
      },

      removeOnlineUser(userId: number | string) {
         this.onlineUsers = this.onlineUsers.filter(u => u.id !== userId);
      },

      reset() {
         this.onlineUsers = [];
      },
   },
});
