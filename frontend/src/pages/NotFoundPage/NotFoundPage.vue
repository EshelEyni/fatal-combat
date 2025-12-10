<template>
   <div class="flex flex-column align-center justify-center text-white">
      <h1 style="font-size: 4rem; font-weight: bold">404</h1>
      <p style="font-size: 1.5rem">Page not found</p>

      <Button class="menu-btn active mt-6 text-2xl" @click="goHome"> Go to Home </Button>
   </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { onMounted, onUnmounted } from "vue";
const router = useRouter();

const goHome = () => {
   router.push("/");
};

const onKeydown = (e: KeyboardEvent) => {
   if (e.key === "Enter") {
      goHome();
   }
};

onMounted(() => {
   addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
   removeEventListener("keydown", onKeydown);
});
</script>

<style scoped></style>
