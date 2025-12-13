<template>
   <div
      class="invite-message"
      v-for="(invite, index) in inviteMessageStore.openInviteMessages"
      :key="index"
   >
      <p class="invite-title">"{{ invite.fromUserName }}" invited you to a game</p>

      <p class="invite-body">"{{ invite.message }}"</p>

      <div class="invite-actions">
         <button class="btn accept" @click="() => onAcceptInvite(invite)">Accept</button>

         <button class="btn close" @click="() => onCloseInvite(invite)">Close</button>

         <button class="btn ignore" @click="() => onRemoveInvite(invite)">Ignore</button>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useLoginWithToken } from "../composables/auth/useLoginWithToken";
import { useInviteMessageStore } from "../store/invites";
import { useWebSocketStore } from "../store/websocket";
import type { GameInviteMessage } from "../type/inviteMessage";

const router = useRouter();
const inviteMessageStore = useInviteMessageStore();
const { loggedInUser } = useLoginWithToken();
const webSocketStore = useWebSocketStore();

const onAcceptInvite = (invite: GameInviteMessage) => {
   if (!loggedInUser.value) return;
   webSocketStore.send({
      type: "accept_game_invite",
      fromUserId: invite.fromUserId,
      toUserId: loggedInUser.value?.id,
   });

   router.push("/game-online");
   inviteMessageStore.removeInviteMessage(invite.fromUserId);
};

const onCloseInvite = (invite: GameInviteMessage) => {
   inviteMessageStore.closeInviteMessage(invite);
};

const onRemoveInvite = (invite: GameInviteMessage) => {
   inviteMessageStore.removeInviteMessage(invite.fromUserId);
};
</script>
<style scoped>
.invite-message {
   position: fixed;
   top: 1rem;
   left: 1rem;
   background: #1b1b1b;
   border: 1px solid #333;
   border-radius: 12px;
   padding: 1.2rem;
   margin-bottom: 1rem;
   color: #f1f1f1;
   animation: slideIn 0.25s ease-out;
}

.invite-title {
   font-size: 1rem;
   margin-bottom: 0.5rem;
   color: #ffd25e;
   text-shadow: 0 0 4px #ff4c29;
}

.invite-body {
   font-size: 0.75rem;
   opacity: 0.85;
}

.invite-actions {
   display: flex;
   justify-content: center;
   gap: 1rem;
   margin-top: 2rem;
}

/* Buttons */
.btn {
   padding: 0.35rem 0.9rem;
   border-radius: 6px;
   border: none;
   cursor: pointer;
   font-weight: 600;
   font-size: 0.9rem;
   transition: 0.2s;
}

.btn.accept {
   background: #4caf50;
   color: white;
}
.btn.accept:hover {
   background: #69c76b;
}

.btn.close {
   background: #ff9800;
   color: white;
}
.btn.close:hover {
   background: #ffad33;
}

.btn.ignore {
   background: #d32f2f;
   color: white;
}
.btn.ignore:hover {
   background: #ef5350;
}

/* Optional animation */
@keyframes slideIn {
   from {
      opacity: 0;
      transform: translateY(8px);
   }
   to {
      opacity: 1;
      transform: translateY(0);
   }
}
</style>
