<template>
  <h1 class="text-6xl font-bold mb-6 italic title">Fatal Combat</h1>

  <router-view />
  <VueQueryDevtools />
</template>

<script setup>
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<style>
.title {
  color: #f3cf60;
  text-shadow: 0 0 12px rgba(232, 59, 6, 0.6), 0 0 22px rgba(243, 207, 96, 0.6);
}

.menu-btn {
  color: #f3cf60;
  background: transparent !important;
  border: none !important;
  transition: all 0.5s ease;
  text-shadow: 0 0 12px rgba(232, 59, 6, 0.6), 0 0 22px rgba(243, 207, 96, 0.6);
}

.active {
  color: #e83b06 !important;
}

.menu-input {
  width: 260px;
  padding: 12px 18px;
  font-size: 1.2rem;
  color: #f3cf60;
  background: transparent;
  border: 2px solid #f3cf60;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
}

.menu-input.active {
  border-color: #e83b06;
  color: #e83b06;
}
</style>
