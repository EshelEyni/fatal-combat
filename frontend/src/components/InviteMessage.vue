<template>
   <div
      class="invite-message"
      v-for="(invite, index) in inviteMessageStore.inviteMessages"
      :key="index"
   >
      <p>
         <strong>{{ invite.fromUser.username }}</strong> has invited you to a game!
      </p>
      <p>"{{ invite.text }}"</p>
      <button @click="() => onAcceptInvite(invite)">Accept Invite</button>
   </div>
</template>
<script setup lang="ts">
import { useLoginWithToken } from "../composables/auth/useLoginWithToken";
import { useInviteMessageStore } from "../store/invites";
import { useWebSocketStore } from "../store/websocket";
const inviteMessageStore = useInviteMessageStore();

const { loggedInUser } = useLoginWithToken();

const webSocketStore = useWebSocketStore();

const onAcceptInvite = (invite: any) => {
   webSocketStore.send({
      type: "accept_game_invite",
      fromUserId: invite.fromUser.id,
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
