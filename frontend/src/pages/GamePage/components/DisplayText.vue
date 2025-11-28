<template>
  <div v-if="visible" class="display-text">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  visible: boolean;
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
