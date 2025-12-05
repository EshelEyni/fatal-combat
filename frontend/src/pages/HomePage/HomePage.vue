<template>
  <div class="flex flex-column align-items-center">
    <div class="flex flex-column align-items-center gap-3">
      <Button
        v-for="btn in buttons"
        :key="btn.key"
        :label="btn.label"
        class="text-3xl uppercase menu-btn"
        :class="{ active: activeKey === btn.key }"
        @click="btn.action"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";
import { useKeyboardMenu } from "../../composables/useKeyboardMenu";

const router = useRouter();
const { loggedInUser } = useAuth();
const isLoggedIn = computed(() => !!loggedInUser.value);

const { activeKey } = useKeyboardMenu(() => buttons.value);

const buttons = computed(() => {
  const arr = [{ key: "play", label: "Play", action: onPlay }];

  if (isLoggedIn.value) {
    arr.push({ key: "logout", label: "Logout", action: onLogout });
  } else {
    arr.push({ key: "login", label: "Login", action: onLogin });
  }

  return arr;
});

const onLogin = () => {
  router.push("/login");
};

const onLogout = () => {
  console.log("log out action");
};

const onPlay = () => {
  router.push("/game");
};
</script>
