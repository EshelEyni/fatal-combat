<template>
  <div class="game-wrapper">
    <div class="hud-wrapper">
      <!-- Player Health -->
      <HealthBar :health="playerHealth" />

      <!-- Timer -->
      <TimerBox :time="timer" />

      <!-- Enemy Health -->
      <HealthBar :health="enemyHealth" />
    </div>

    <DisplayText :text="displayText" :visible="displayTextVisible" />

    <!-- The canvas -->
    <GameCanvas />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import GameCanvas from "./components/GameCanvas.vue";
import HealthBar from "./components/HealthBar.vue";
import TimerBox from "./components/TimerBox.vue";
import DisplayText from "./components/DisplayText.vue";

const playerHealth = ref(100);
const enemyHealth = ref(100);
const timer = ref(60);

const displayText = ref("Tie");
const displayTextVisible = ref(false);

/**
 * Here you will connect the game engine to Vue refs
 * (when multiplayer comes in, we'll move this to Pinia)
 */
onMounted(() => {
  // TODO: Connect real game engine events (we'll do this next)
});
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
