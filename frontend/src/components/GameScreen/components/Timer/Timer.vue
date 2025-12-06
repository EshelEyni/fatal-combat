<template>
   <div class="timer">{{ time }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { createTimer, determineWinner } from "./createTimer";

const props = defineProps<{
   player1Health: number;
   player2Health: number;
}>();

const emit = defineEmits<{
   (e: "done", winner: string | null): void;
}>();

const defaultSeconds = 90;
const time = ref(defaultSeconds);

const decideAndEmitWinner = () => {
   const winner = determineWinner(props.player1Health, props.player2Health, time.value);

   if (!winner) return;
   emit("done", winner);
};

const timerCtl = createTimer({
   seconds: defaultSeconds,
   onTick: s => {
      time.value = s;
      decideAndEmitWinner();
   },
   onDone: decideAndEmitWinner,
});

onMounted(() => timerCtl.start());
onBeforeUnmount(() => timerCtl.stop());
</script>

<style scoped>
.timer {
   position: absolute;
   top: 10px;
   left: 50%;
   transform: translateX(-50%);
   background: black;
   width: 100px;
   height: 50px;
   color: white;
   border: 4px solid white;
   display: flex;
   align-items: center;
   justify-content: center;
}
</style>
