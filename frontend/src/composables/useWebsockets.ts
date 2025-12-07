import { ref, onBeforeUnmount, onMounted } from "vue";

export function useWebSocket(url: string, handleMessage: (message: any) => void) {
   const socket = ref<WebSocket>(new WebSocket(url));

   function send(data: any) {
      socket.value?.send(JSON.stringify(data));
   }

   onMounted(() => {
      socket.value.onmessage = event => {
         const msg = JSON.parse(event.data);
         handleMessage(msg);
      };
   });

   onBeforeUnmount(() => {
      socket.value?.close();
   });

   return { socket, send };
}
