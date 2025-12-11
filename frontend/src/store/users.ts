import { defineStore } from "pinia";
import type { User } from "../type/user";
import type { ServerSocketMessage } from "../type/serverSocketMessage";

export const useOnlineUsersStore = defineStore("onlineUsers", {
   state: () => ({
      onlineUsers: [] as User[],
   }),
   getters: {
      onlineCount: state => state.onlineUsers.length,

      getUserById: state => (id: string) => {
         return state.onlineUsers.find(u => u.id === id);
      },
   },
   actions: {
      socketEventHandler(msg: ServerSocketMessage) {
         if (msg.type === "lobby_users") {
            this.onlineUsers = msg.users;
         }
         if (msg.type === "user_joined_lobby") {
            const map = new Map(this.onlineUsers.map(u => [u.id, u]));
            map.set(msg.user.id, msg.user);
            this.onlineUsers = Array.from(map.values());
         }
         if (msg.type === "user_left_lobby") {
            this.onlineUsers = this.onlineUsers.filter(u => u.id !== msg.user.id);
         }
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
