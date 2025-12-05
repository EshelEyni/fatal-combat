<template>
   <div class="game-screen">
      <div class="game-canvas-wrapper">
         <canvas ref="canvasRef"></canvas>
      </div>
      <TimerBox
         :player1Health="player_1.health"
         :player2Health="player_2.health"
         @done="w => (winner = w)"
      />
      <HealthBar :health="player_1.health" :align="'left'" />
      <HealthBar :health="player_2.health" :align="'right'" />
      <DisplayText v-if="winner" :winner="winner" />
   </div>
</template>

<script setup lang="ts">
import HealthBar from "./components/HealthBar.vue";
import TimerBox from "./components/Timer/Timer.vue";
import DisplayText from "./components/DisplayText.vue";
import { ref } from "vue";
import type { Fighter } from "../../classes/Fighter";

const props = defineProps<{
   player_1: Fighter;
   player_2: Fighter;
}>();

const { player_1, player_2 } = props;
const winner = ref<string | null>(null);

const canvasRef = ref<HTMLCanvasElement | null>(null);

defineExpose({ canvasRef });
</script>

<style scoped>
.game-screen {
   position: relative;
   display: inline-block;
}

.game-canvas-wrapper {
   width: 100%;
   display: flex;
   justify-content: center;
}
canvas {
   border: 1px solid black;
   border-radius: 8px;
}
</style>
