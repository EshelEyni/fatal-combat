import { defineStore } from "pinia";
import type { User } from "../type/user";

export const useWebSocketStore = defineStore("websocket", {
   state: () => ({
      socket: null as WebSocket | null,
      isConnected: false,
   }),

   getters: {
      connectionStatus: state => state.isConnected,
   },

   actions: {
      connect(messageHandler: (msg: any) => void) {
         if (this.socket) return;

         this.socket = new WebSocket("ws://localhost:8000/ws");

         this.socket.onopen = () => {
            this.isConnected = true;
         };

         this.socket.onclose = () => {
            this.isConnected = false;
            this.socket = null;
         };

         this.socket.onerror = (err: Event) => {
            console.error("WS error:", err);
         };

         this.socket.onmessage = (event: MessageEvent) => {
            messageHandler(JSON.parse(event.data));
         };
      },

      send(data: any) {
         if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
         this.socket.send(JSON.stringify(data));
      },

      joinLobby(user: User) {
         if (!this.isConnected) return;

         const stringifedMsg = JSON.stringify({
            type: "join_lobby",
            user,
         });

         this.socket!.send(stringifedMsg);
      },

      disconnect() {
         this.socket?.close();
         this.socket = null;
         this.isConnected = false;
      },
   },
});
