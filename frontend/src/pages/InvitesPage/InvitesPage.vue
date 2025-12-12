<template>
   <div class="invite-page">
      <!-- Search Bar -->
      <div class="search-wrapper">
         <input
            type="text"
            class="search-input"
            v-model="search"
            placeholder="Search invites by username..."
         />
      </div>

      <!-- Empty State -->
      <div v-if="filteredInvites.length === 0" class="empty-state">No invites found.</div>

      <!-- Invite Cards -->
      <div class="card-grid" v-else>
         <InviteCard
            v-for="invite in filteredInvites"
            :key="`${invite.fromUserId}-${invite.receivedAt}`"
            :invite="invite"
            @accept="onAcceptInvite"
            @close="onCloseInvite"
         />
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import InviteCard from "./components/InviteCard.vue";
import { useInviteMessageStore } from "../../store/invites";
import { useWebSocketStore } from "../../store/websocket";
import { useLoginWithToken } from "../../composables/auth/useLoginWithToken";
import { useRouter } from "vue-router";

const inviteMessageStore = useInviteMessageStore();
const webSocketStore = useWebSocketStore();
const { loggedInUser } = useLoginWithToken();
const router = useRouter();

const search = ref("");

const filteredInvites = computed(() => {
   if (!search.value) return inviteMessageStore.inviteMessages;
   return inviteMessageStore.inviteMessages.filter(i =>
      i.fromUserName.toLowerCase().includes(search.value.toLowerCase()),
   );
});

const onAcceptInvite = (invite: any) => {
   if (!loggedInUser.value) return;
   webSocketStore.send({
      type: "accept_game_invite",
      fromUserId: invite.fromUserId,
      toUserId: loggedInUser.value.id,
   });
   router.push("/game-online");
};

const onCloseInvite = (invite: any) => {
   inviteMessageStore.closeInviteMessage(invite);
};

onMounted(() => {
   inviteMessageStore.markAllInviteMessagesAsClosed();
});
</script>

<style scoped>
.invite-page {
   padding: 2rem;
   color: #f1f1f1;
   width: 100%;
   max-width: 960px;
}

.search-wrapper {
   display: flex;
   justify-content: center;
   width: 100%;
   margin-bottom: 2rem;
}

.search-input {
   width: 100%;
   max-width: 400px;
   padding: 0.6rem 1rem;
   border-radius: 8px;
   border: 1px solid #555;
   background: #1b1b1b;
   color: white;
   font-size: 1rem;
}

.empty-state {
   margin-top: 4rem;
   text-align: center;
   font-size: 1.2rem;
   opacity: 0.7;
}

.card-grid {
   display: grid;
   width: 100%;
   gap: 1.5rem;
   grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
</style>
