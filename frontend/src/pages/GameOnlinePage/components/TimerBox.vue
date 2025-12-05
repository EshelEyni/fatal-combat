<template>
  <div class="timer">{{ time }}</div>
</template>

<script setup lang="ts">
defineProps<{ time: number }>();
</script>

<style scoped>
.timer {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  width: 100px;
  height: 50px;
  color: white;
  border: 4px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
