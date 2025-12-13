import { defineStore } from "pinia";
import type { ServerSocketMessage } from "../type/serverSocketMessage";
import type { ClientSocketMessage } from "../type/clientServerSocketMessage";
import { getBaseServerUrl } from "../services/utils/getBaseServerUrl";

const SOCKET_SERVER_URL = getBaseServerUrl("websocket");

export const useWebSocketStore = defineStore("websocket", {
   state: () => ({
      socket: null as WebSocket | null,
      isConnected: false,
   }),

   getters: {
      connectionStatus: state => state.isConnected,
   },

   actions: {
      connect(messageHandler: (msg: ServerSocketMessage) => void) {
         if (this.socket) return;

         this.socket = new WebSocket(SOCKET_SERVER_URL);

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
            const msg = JSON.parse(event.data);
            console.log(msg);

            messageHandler(msg);
         };
      },

      send(data: ClientSocketMessage) {
         if (!this.socket || !this.isConnected) return;
         this.socket.send(JSON.stringify(data));
      },

      disconnect() {
         this.socket?.close();
         this.socket = null;
         this.isConnected = false;
      },
   },
});
