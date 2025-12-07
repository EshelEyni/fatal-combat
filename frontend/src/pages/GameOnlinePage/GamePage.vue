<template>
   <div v-if="currentScreen === 'lobby'">
      <ul>
         <li
            v-for="user in onlineUsers"
            :key="user.id"
            @click="onInviteToGame({ fromUserId: loggedInUser?.id, toUserId: user.id })"
            class="hover:underline cursor-pointer"
         >
            {{ user.username }}
         </li>
      </ul>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOnlineUsersStore } from "../../store/users";
import { storeToRefs } from "pinia";
import { useWebSocketStore } from "../../store/websocket";
import { useLoginWithToken } from "../../composables/auth/useLoginWithToken";

const webSocketStore = useWebSocketStore();
const onlineUsersStore = useOnlineUsersStore();
const { onlineUsers } = storeToRefs(onlineUsersStore);
const { loggedInUser } = useLoginWithToken();

const currentScreen = ref<"lobby" | "game">("lobby");

const onInviteToGame = (data: any) => {
   if (!webSocketStore.connectionStatus) return;
   if (!data.fromUserId || !data.toUserId) return;
   webSocketStore.send({
      type: "send_game_invite",
      fromUserId: data.fromUserId,
      toUserId: data.toUserId,
   });
};
</script>

<style scoped>
.game-wrapper {
   position: relative;
   display: inline-block;
}
</style>
