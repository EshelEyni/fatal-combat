<template>
   <InviteMessagePopUp />
   <div v-if="isLoadingLoggedInUser"><Loader /></div>
   <div class="flex flex-column align-items-center gap-3" v-else>
      <Button
         v-for="btn in buttons"
         :key="btn.key"
         :label="btn.label"
         class="text-3xl uppercase menu-btn"
         @click="btn.action"
      />
   </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { useLoginWithToken } from "../../composables/auth/useLoginWithToken";
import { useLogout } from "../../composables/auth/useLogout";
import InviteMessagePopUp from "../../components/InviteMessagePopUp.vue";
import Loader from "../../components/Loader.vue";
import { useInviteMessageStore } from "../../store/invites";

const router = useRouter();
const { loggedInUser, isLoadingLoggedInUser } = useLoginWithToken();
const { logout } = useLogout();
const isLoggedIn = computed(() => !!loggedInUser.value);
const inviteMessageStore = useInviteMessageStore();

const buttons = computed(() => {
   const playButton = { key: "play", label: "Play", action: () => onNavigate("/game-mode") };

   const authButtons = isLoggedIn.value
      ? [{ key: "logout", label: "Logout", action: onLogout }]
      : [
           { key: "signup", label: "Signup", action: () => onNavigate("/signup") },
           { key: "login", label: "Login", action: () => onNavigate("/login") },
        ];

   const inviteButton = {
      key: "invites",
      label: inviteMessageStore.openedInviteMessagesCount
         ? `Invites (${inviteMessageStore.openedInviteMessagesCount})`
         : "Invites",
      action: () => onNavigate("/invites"),
   };

   const aboutButton = { key: "about", label: "About", action: () => onNavigate("/about") };

   if (isLoggedIn.value) return [playButton, inviteButton, ...authButtons, aboutButton];
   return [playButton, ...authButtons, aboutButton];
});

const onNavigate = (path: string) => {
   router.push(path);
};

const onLogout = () => {
   logout();
};
</script>
