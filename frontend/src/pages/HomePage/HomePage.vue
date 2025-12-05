<template>
  <div class="flex flex-column align-items-center">
    <div class="flex flex-column align-items-center gap-3">
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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { useLoginWithToken } from "../../composables/auth/useLoginWithToken";
import { useKeyboardMenu } from "../../composables/useKeyboardMenu";
import { useLogout } from "../../composables/auth/useLogout";

const router = useRouter();
const { loggedInUser } = useLoginWithToken();
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
    { key: "play", label: "Play", action: () => onNavigate("/game") },
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
