<template>
   <div class="invite-message">
      <p>
         <strong>{{ props.fromUser.username }}</strong> has invited you to a game!
      </p>
      <p>"{{ props.text }}"</p>
      <button @click="onAcceptInviye">Accept Invite</button>
   </div>
</template>
<script setup lang="ts">
import { useLoginWithToken } from "../composables/auth/useLoginWithToken";
import { useWebSocketStore } from "../store/websocket";

const props = defineProps<{
   fromUser: {
      id: string;
      username: string;
   };
   text: string;
}>();
const { loggedInUser } = useLoginWithToken();

const webSocketStore = useWebSocketStore();

const onAcceptInviye = () => {
   webSocketStore.send({
      type: "accept_game_invite",
      fromUserId: props.fromUser.id,
      toUserId: loggedInUser.value?.id,
   });
};
</script>
<style scoped>
.invite-message {
   border: 2px solid #f3cf60;
   padding: 1rem;
   margin: 1rem 0;
   border-radius: 8px;
   background-color: #1e1e1e;
   box-shadow: 0 0 10px rgba(243, 207, 96, 0.5);
}
</style>
