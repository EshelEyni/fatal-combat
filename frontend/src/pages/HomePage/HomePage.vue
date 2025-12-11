<template>
   <InviteMessagePopUp />
   <div v-if="isLoadingLoggedInUser"><Loader /></div>
   <div class="flex flex-column align-items-center gap-3" v-else>
      <Button
         v-for="(btn, i) in buttons"
         :key="btn.key"
         :label="btn.label"
         class="text-3xl uppercase menu-btn"
         :class="{ active: activeKey === btn.key }"
         @click="btn.action"
         :ref="setItemRef(i)"
         tabindex="0"
      />
   </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { useLoginWithToken } from "../../composables/auth/useLoginWithToken";
import { useKeyboardMenu } from "../../composables/useKeyboardMenu";
import { useLogout } from "../../composables/auth/useLogout";
import InviteMessagePopUp from "../../components/InviteMessagePopUp.vue";
import Loader from "../../components/Loader.vue";

const router = useRouter();
const { loggedInUser, isLoadingLoggedInUser } = useLoginWithToken();
const { logout } = useLogout();
const isLoggedIn = computed(() => !!loggedInUser.value);

const { activeKey, setItemRef } = useKeyboardMenu(() => buttons.value);

const buttons = computed(() => {
   const authButtons = isLoggedIn.value
      ? [{ key: "logout", label: "Logout", action: onLogout }]
      : [
           { key: "signup", label: "Signup", action: () => onNavigate("/signup") },
           { key: "login", label: "Login", action: () => onNavigate("/login") },
        ];

   return [
      { key: "play", label: "Play", action: () => onNavigate("/game-mode") },
      ...authButtons,
      { key: "about", label: "About", action: () => onNavigate("/about") },
   ];
});

const onNavigate = (path: string) => {
   router.push(path);
};

const onLogout = () => {
   logout();
};
</script>
