import { useQueryClient } from "@tanstack/vue-query";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

export function useWebSocket(url: string) {
   const queryClient = useQueryClient();
   const a = queryClient.getQueryData(["loggedInUser"]);

   console.log({ a });

   const socket = ref<WebSocket | null>(null);

   function send(data: any) {
      socket.value?.send(JSON.stringify(data));
   }

   const messages = ref<any[]>([]);

   onMounted(() => {
      socket.value = new WebSocket(url);

      socket.value.onmessage = event => {
         messages.value.push(JSON.parse(event.data));
      };
   });

   watch(socket, newSocket => {
      if (!newSocket) return;

      newSocket.onopen = () => {
         newSocket.send(JSON.stringify({ type: "join_lobby", username: "player1" }));
      };

      newSocket.onclose = () => {
         console.log("WebSocket connection closed");
         newSocket.send(JSON.stringify({ type: "leave_lobby", username: "player1" }));
      };
   });

   onBeforeUnmount(() => {
      socket.value?.close();
   });

   return { socket, send, messages };
}
