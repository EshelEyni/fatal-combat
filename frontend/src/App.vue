<template>
  <h1 class="text-6xl font-bold mb-6 italic title">Fatal Combat</h1>

  <router-view />
</template>

<style scoped>
.title {
  color: #f3cf60;
  text-shadow: 0 0 12px rgba(232, 59, 6, 0.6), 0 0 22px rgba(243, 207, 96, 0.6);
}

.menu-btn {
  color: #f3cf60;
  background: transparent !important;
  border: none !important;
  transition: color 0.3s ease;
  text-shadow: 0 0 12px rgba(232, 59, 6, 0.6), 0 0 22px rgba(243, 207, 96, 0.6);
}

.menu-btn:active {
  color: #e83b06 !important;
}

.menu-btn:hover {
  color: #e83b06 !important;
}
</style>
