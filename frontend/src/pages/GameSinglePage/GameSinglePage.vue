<template>
   <GameScreen :player_1="player_1" :player_2="player_2" ref="gameCanvasComponent" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import GameScreen from "../../components/GameScreen/GameScreen .vue";
import { useGameEngine } from "../../composables/gameEngine/useGameEngine/useGameEngine";
import { GameMode } from "../../composables/gameEngine/useGameEngine/types/GameMode";

const { canvasEl, player_1, player_2 } = useGameEngine(GameMode.SINGLE_PLAYER);

const gameCanvasComponent = ref<InstanceType<typeof GameScreen> | null>(null);

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
