<template></template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useLoginWithToken } from "../../composables/auth/useLoginWithToken";
import { useWebSocket } from "../../composables/useWebsockets";
const url = "ws://localhost:8000/ws";

const { loggedInUser } = useLoginWithToken();
const { socket, send } = useWebSocket(url);

onMounted(() => {
   if (!loggedInUser.value) return;

   socket.value.onopen = () => {
      const stringifedMsg = JSON.stringify({
         type: "join_lobby",
         username: loggedInUser.value.id,
      });

      socket.value.send(stringifedMsg);
   };
});
</script>

<style scoped>
.game-wrapper {
   position: relative;
   display: inline-block;
}
</style>
