<template></template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useLoginWithToken } from "../../composables/auth/useLoginWithToken";
import { useWebSocket } from "../../composables/useWebsockets";
const url = "ws://localhost:8000/ws";

const { loggedInUser } = useLoginWithToken();

const handleMessage = (msg: any) => {
   console.log("Message from server ", msg);
};

const { socket, send, messages } = useWebSocket(url, handleMessage);

onMounted(() => {
   if (!loggedInUser.value) return;

   socket.value.onopen = () => {
      const stringifedMsg = JSON.stringify({
         type: "join_lobby",
         user: loggedInUser.value,
      });

      socket.value.send(stringifedMsg);
   };
});

watch(messages, newMessages => {
   console.log("New message received:", newMessages);
});
</script>

<style scoped>
.game-wrapper {
   position: relative;
   display: inline-block;
}
</style>
