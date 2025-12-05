<template>
  <div class="timer">{{ time }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { createTimer } from "./createTimer";

const props = defineProps<{
  seconds: number;
  player1Health: number;
  player2Health: number;
}>();

const emit = defineEmits<{
  (e: "tick", time: number): void;
  (e: "done", winner: string | null): void;
}>();

const time = ref(props.seconds);

const timerCtl = createTimer({
  seconds: props.seconds,
  onTick: (s) => {
    time.value = s;
    emit("tick", s);
  },
  onDone: () => {
    const winner =
      props.player1Health === props.player2Health
        ? "tie"
        : props.player1Health > props.player2Health
        ? "player_1"
        : "player_2";

    emit("done", winner);
  },
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
