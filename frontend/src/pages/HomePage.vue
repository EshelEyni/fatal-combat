<template>
  <div class="p-4">
    <h1>PrimeVue Theme Test</h1>

    <Button label="Click Me" class="mt-4" />
    <InputText placeholder="Type here..." class="mt-4 block" />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import InputText from "primevue/inputtext";
</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}
.block {
  display: block;
}
</style>
