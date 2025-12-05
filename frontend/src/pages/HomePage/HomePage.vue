<template>
  <div class="flex flex-column align-items-center">
    <div class="flex flex-column align-items-center gap-3">
      <Button
        v-for="btn in buttons"
        :key="btn.key"
        :label="btn.label"
        class="text-3xl uppercase menu-btn"
        :class="{ active: activeBtn === btn.key }"
        @click="btn.action"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";

const router = useRouter();
const { loggedInUser } = useAuth();
const isLoggedIn = computed(() => !!loggedInUser.value);

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

const activeBtn = ref<"play" | "login">("play");

const triggerActive = () => {
  if (activeBtn.value === "play") onPlay();
  else if (activeBtn.value === "login") {
    !!loggedInUser.value ? onLogout() : onLogin();
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
