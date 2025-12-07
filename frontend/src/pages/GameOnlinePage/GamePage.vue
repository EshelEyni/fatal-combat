<template></template>

<script setup lang="ts">
import { useWebSocket } from "../../composables/useWebsockets";

const { socket, send } = useWebSocket("ws://localhost:8000/ws");
</script>

<style scoped>
.game-wrapper {
   position: relative;
   display: inline-block;
}
</style>
