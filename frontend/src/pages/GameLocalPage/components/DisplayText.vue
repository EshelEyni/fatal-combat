<template>
  <div class="display-text">
    <span v-if="winner === 'player_1'">Player 1 Wins!</span>
    <span v-else-if="winner === 'player_2'">Player 2 Wins!</span>
    <span v-else>Tie!</span>
  </div>
</template>

<script setup lang="ts">
import { type Winner } from "./Timer/createTimer";
defineProps<{
  winner: Winner;
}>();
</script>

<style scoped>
.display-text {
  position: absolute;
  color: white;
  font-size: 48px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
