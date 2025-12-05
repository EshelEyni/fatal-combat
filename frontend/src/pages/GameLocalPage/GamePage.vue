<template>
  <div class="game-wrapper">
    <GameCanvas ref="gameCanvasComponent" />
    <TimerBox
      :seconds="90"
      :player1Health="player_1.health"
      :player2Health="player_2.health"
      @tick="(s) => (timer = s)"
      @done="(w) => (winner = w)"
    />
    <HealthBar :health="player_1.health" :align="'left'" />
    <HealthBar :health="player_2.health" :align="'right'" />
    <DisplayText v-if="winner" :winner="winner" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import GameCanvas from "./components/GameCanvas.vue";
import HealthBar from "./components/HealthBar.vue";
import TimerBox from "./components/Timer/Timer.vue";
import DisplayText from "./components/DisplayText.vue";
import { useGameEngine } from "../../composables/gameEngine/useLocalMultiplayerGameEngine/useLocalMultiplayerGameEngine";

const gameCanvasComponent = ref<InstanceType<typeof GameCanvas> | null>(null);

const { canvasEl, player_1, player_2 } = useGameEngine();
console.log({
  player_1, player_2
});

const timer = ref(90);
const winner = ref<string | null>(null);

onMounted(() => {
  if (!gameCanvasComponent.value) return;
  canvasEl.value = gameCanvasComponent.value.canvasRef;
});
</script>

<style scoped>
.game-wrapper {
  position: relative;
  display: inline-block;
}
</style>
