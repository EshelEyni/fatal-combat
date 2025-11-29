<template>
  <div class="game-wrapper">
    <GameCanvas ref="gameCanvasComponent" />
    <!-- <HealthBar :player="player" :enemy="enemy" />
    <TimerBox :time="timer" />
    <DisplayText v-if="winner" :winner="winner" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import GameCanvas from "./components/GameCanvas.vue";
// import HealthBar from "./components/HealthBar.vue";
// import TimerBox from "./components/TimerBox.vue";
// import DisplayText from "./components/DisplayText.vue";
import { useGameEngine } from "./useGameEngine";
import { createTimer, pickWinner, type Winner } from "./util";

const gameCanvasComponent = ref<InstanceType<typeof GameCanvas> | null>(null);

const { canvasEl, player, enemy } = useGameEngine();

const timer = ref(60);
const winner = ref<Winner | null>(null);

const timerCtl = createTimer(
  60,
  (s) => (timer.value = s),
  () => {
    // when time’s up, ask pure function for winner
    winner.value = pickWinner(player.health, enemy.health);
  }
);

onMounted(() => {
  // Access the exposed canvasRef from the child component
  if (gameCanvasComponent.value) {
    canvasEl.value = gameCanvasComponent.value.canvasRef;
    timerCtl.start();
  }
});
onBeforeUnmount(() => timerCtl.stop());
</script>

<style scoped>
.game-wrapper {
  position: relative;
  display: inline-block;
}

.hud-wrapper {
  position: absolute;
  display: flex;
  width: 100%;
  padding: 20px;
  align-items: center;
  z-index: 10;
}
</style>
