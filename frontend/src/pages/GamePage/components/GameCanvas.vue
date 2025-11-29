<script setup lang="ts">
import { ref } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);

// Expose the ref so parent can access it
defineExpose({ canvasRef });
</script>

<template>
  <div class="game-canvas-wrapper">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
.game-canvas-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
canvas {
  border: 1px solid black;
}
</style>
