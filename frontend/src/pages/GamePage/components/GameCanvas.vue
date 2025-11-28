<template>
  <canvas
    ref="canvasRef"
    width="1024"
    height="576"
    class="game-canvas"
  ></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { startGameEngine } from "../../../services/game";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let stopGame: (() => void) | null = null;

onMounted(() => {
  if (canvasRef.value) {
    stopGame = startGameEngine(canvasRef.value);
  }
});

onBeforeUnmount(() => {
  stopGame?.();
});
</script>

<style scoped>
.game-canvas {
  display: block;
}
</style>
