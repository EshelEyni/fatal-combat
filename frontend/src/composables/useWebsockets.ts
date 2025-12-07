import { ref, onBeforeUnmount } from "vue";

export function useWebSocket(url: string) {
   const socket = ref<WebSocket>(new WebSocket(url));

   function send(data: any) {
      socket.value?.send(JSON.stringify(data));
   }

   const messages = ref<any[]>([]);

   onBeforeUnmount(() => {
      socket.value?.close();
   });

   return { socket, send, messages };
}
