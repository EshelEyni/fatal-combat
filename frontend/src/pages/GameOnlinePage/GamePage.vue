<template>
   <div v-if="!inviteMessageStore.roomDetails">
      <InviteMessage />
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
   <div v-else>
      <GameScreen :player_1="player_1" :player_2="player_2" ref="gameCanvasComponent" />
   </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useOnlineUsersStore } from "../../store/users";
import { storeToRefs } from "pinia";
import { useWebSocketStore } from "../../store/websocket";
import { useLoginWithToken } from "../../composables/auth/useLoginWithToken";
import { useInviteMessageStore } from "../../store/invites";
import { useGameEngine } from "../../composables/gameEngine/useGameEngine/useGameEngine";
import { GameMode } from "../../composables/gameEngine/useGameEngine/types/GameMode";
import GameScreen from "../../components/GameScreen/GameScreen .vue";
import InviteMessage from "../../components/InviteMessage.vue";

const webSocketStore = useWebSocketStore();
const onlineUsersStore = useOnlineUsersStore();
const inviteMessageStore = useInviteMessageStore();
const roomDetails = computed(() => inviteMessageStore.roomDetails);
const { onlineUsers } = storeToRefs(onlineUsersStore);
const { loggedInUser } = useLoginWithToken();

const onInviteToGame = (data: any) => {
   if (!webSocketStore.connectionStatus) return;
   if (!data.fromUserId || !data.toUserId) return;
   webSocketStore.send({
      type: "send_game_invite",
      fromUserId: data.fromUserId,
      toUserId: data.toUserId,
   });
};

const { canvasEl, player_1, player_2 } = useGameEngine(GameMode.ONLINE_MULTIPLAYER, roomDetails);

const gameCanvasComponent = ref<InstanceType<typeof GameScreen> | null>(null);

watch(gameCanvasComponent, () => {
   if (!gameCanvasComponent.value) return;
   canvasEl.value = gameCanvasComponent.value.canvasRef;
});
</script>

<style scoped>
.game-wrapper {
   position: relative;
   display: inline-block;
}
</style>
