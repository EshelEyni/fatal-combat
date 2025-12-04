<template>
  <div class="flex flex-column align-items-center">
    <div class="flex flex-column align-items-center gap-3">
      <Button
        label="Play"
        class="text-3xl uppercase menu-btn"
        :class="{ active: activeBtn === 'play' }"
        @click="onPlay"
      />

      <Button
        :label="isLoggedIn ? 'Logout' : 'Login'"
        class="text-3xl uppercase menu-btn"
        :class="{ active: activeBtn === 'login' }"
        @click="isLoggedIn ? onLogout() : onLogin()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";
const router = useRouter();

const activeBtn = ref<"play" | "login">("play");
const isLoggedIn = ref(false);

const onLogin = () => {
  router.push("/login");
};

const onLogout = () => {
  console.log("log out action");
};

const onPlay = () => {
  router.push("/game");
};

const triggerActive = () => {
  if (activeBtn.value === "play") onPlay();
  else if (activeBtn.value === "login") {
    isLoggedIn.value ? onLogout() : onLogin();
  }
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "ArrowDown") {
    activeBtn.value = activeBtn.value === "play" ? "login" : "play";
  }

  if (e.key === "ArrowUp") {
    activeBtn.value = activeBtn.value === "play" ? "login" : "play";
  }

  if (e.key === "Enter") {
    triggerActive();
  }
};

onMounted(() => window.addEventListener("keydown", onKeyDown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown));
</script>
