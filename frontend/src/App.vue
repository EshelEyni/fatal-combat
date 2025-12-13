<template>
   <h1 class="text-6xl font-bold mb-6 italic title cursor-pointer" @click="onClickTitle">
      Fatal Combat
   </h1>

   <router-view />
   <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { useLoginWithToken } from "./composables/auth/useLoginWithToken";
import { useOnlineUsersStore } from "./store/users";
import { watch } from "vue";
import { useWebSocketStore } from "./store/websocket";
import { storeToRefs } from "pinia";
import { useInviteMessageStore } from "./store/invites";
import { useRouter } from "vue-router";
import type { ServerSocketMessage } from "./type/serverSocketMessage";

const router = useRouter();
const onlineUsersStore = useOnlineUsersStore();
const inviteMessageStore = useInviteMessageStore();
const webSocketStore = useWebSocketStore();
const { isConnected } = storeToRefs(webSocketStore);
const { loggedInUser } = useLoginWithToken();

webSocketStore.connect((msg: ServerSocketMessage) => {
   console.log(msg);
   
   onlineUsersStore.socketEventHandler(msg);
   inviteMessageStore.socketEventHandler(msg, loggedInUser.value?.id);
});

const onClickTitle = () => {
   router.push("/");
};

watch([isConnected, loggedInUser], ([newConnectionStatus, newLoggedInUser]) => {
   if (!newConnectionStatus || !newLoggedInUser) return;
   webSocketStore.send({
      type: "join_lobby",
      user: newLoggedInUser,
   });
});
</script>

<style>
.title {
   color: #f3cf60;
   text-shadow:
      0 0 12px rgba(232, 59, 6, 0.6),
      0 0 22px rgba(243, 207, 96, 0.6);
}

.menu-btn {
   color: #f3cf60;
   background: transparent !important;
   border: none !important;
   transition: all 0.5s ease;
   text-shadow:
      0 0 2px rgba(232, 59, 6, 0.6),
      0 0 8px rgba(243, 207, 96, 0.6);
}

.menu-btn:hover {
   color: #e83b06 !important;
}

.menu-btn:focus-visible {
   transform: scale(0.95);
   outline: none !important;
   border: none !important;
}

.active {
   color: #e83b06 !important;
}

.menu-input {
   width: 260px;
   padding: 12px 18px;
   font-size: 1.2rem;
   color: #f3cf60;
   background: transparent;
   border: 2px solid #f3cf60;
   border-radius: 8px;
   outline: none;
   transition: all 0.3s ease;
}

.menu-input:focus {
   border-color: #e83b06;
   color: #e83b06;
}
</style>
