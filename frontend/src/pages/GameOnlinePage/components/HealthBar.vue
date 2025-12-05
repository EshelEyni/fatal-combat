<template>
  <div class="hb-container" :class="align">
    <div class="hb-background"></div>
    <div class="hb-foreground" :style="{ width: health + '%' }"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  health: number;
  align: "left" | "right";
}>();
</script>

<style scoped>
.hb-container {
  position: absolute;
  top: 20px;
  height: 30px;
  width: calc(50% - 59px);
  display: flex;
  border: 4px solid white;
}

.hb-container.left {
  left: 10px;
  justify-content: flex-end;
  border-right: none;
}

.hb-container.right {
  right: 10px;
  border-left: none;
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
