<template>
   <div v-if="!inviteMessageStore.roomDetails" class="online-page">
      <InviteMessagePopUp />
      <ul class="user-list">
         <li v-for="user in onlineUsers" :key="user.id" class="user-item">
            <span class="user-name">{{ user.username }}</span>

            <button
               class="invite-btn"
               @click="onInviteToGame({ fromUserId: loggedInUser?.id, toUserId: user.id })"
            >
               Invite
            </button>
         </li>
      </ul>
   </div>
   <div v-else>
      <GameScreen :player_1="player_1" :player_2="player_2" ref="gameCanvasComponent" />
   </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";
import { useOnlineUsersStore } from "../../store/users";
import { storeToRefs } from "pinia";
import { useWebSocketStore } from "../../store/websocket";
import { useLoginWithToken } from "../../composables/auth/useLoginWithToken";
import { useInviteMessageStore } from "../../store/invites";
import { useGameEngine } from "../../composables/useGameEngine/useGameEngine";
import { GameMode } from "../../composables/useGameEngine/types/GameMode";
import GameScreen from "../../components/GameScreen/GameScreen .vue";
import InviteMessagePopUp from "../../components/InviteMessagePopUp.vue";

const webSocketStore = useWebSocketStore();
const onlineUsersStore = useOnlineUsersStore();
const inviteMessageStore = useInviteMessageStore();
const { roomDetails } = storeToRefs(inviteMessageStore);
const { onlineUsers } = storeToRefs(onlineUsersStore);
const { loggedInUser } = useLoginWithToken();

const onInviteToGame = (data: { fromUserId?: string; toUserId?: string }) => {
   if (!webSocketStore.connectionStatus || !data.fromUserId || !data.toUserId) return;
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

onUnmounted(() => {
   inviteMessageStore.clearRoomDetails();
});
</script>

<style scoped>
.online-page {
   position: relative;
   display: inline-block;
   width: 100%;
}

.user-list {
   list-style: none;
   padding: 0;
   margin: 2rem auto;
   max-width: 500px;
}

.user-item {
   background: #1a1a1a;
   border: 1px solid #333;
   padding: 0.8rem 1rem;
   margin-bottom: 0.6rem;
   border-radius: 8px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   transition: 0.2s;
}

.user-item:hover,
.user-item.active {
   border-color: #ff6a00;
   background: #222;
   box-shadow: 0 0 8px #ff6a00;
}

.user-name {
   color: #f1f1f1;
   font-weight: 600;
   font-size: 1.05rem;
}

.invite-btn {
   background: linear-gradient(90deg, #ff9800, #ff6a00);
   border: none;
   padding: 0.3rem 0.7rem;
   border-radius: 6px;
   color: #fff;
   font-size: 1.25rem;
   font-weight: bold;
   cursor: pointer;
   transition: 0.2s;
}

.invite-btn:hover {
   transform: scale(1.05);
   box-shadow: 0 0 6px #ff6a00;
}
</style>
