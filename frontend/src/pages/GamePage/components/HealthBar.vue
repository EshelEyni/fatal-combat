<template>
  <div class="hb-container" :style="containerStyle">
    <div class="hb-background"></div>
    <div class="hb-foreground" :style="{ width: health + '%' }"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  health: number;
  align?: "left" | "right";
}>();

const containerStyle = {
  justifyContent: "flex-end",
};
</script>

<style scoped>
.hb-container {
  position: relative;
  height: 30px;
  width: 100%;
  display: flex;
  border: 4px solid white;
}

.hb-background {
  background: red;
  width: 100%;
  height: 100%;
}

.hb-foreground {
  position: absolute;
  top: 0;
  bottom: 0;
  background: #818cf8;
}
</style>
