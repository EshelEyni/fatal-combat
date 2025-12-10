<template>
   <div v-if="hasError" class="fatal-error-wrapper">
      <div class="fatal-error-box">
         <h1 class="fatal-title">Fatal Error</h1>
         <p>{{ errorMessage }}</p>

         <div class="flex gap-2 flex-column mt-6">
            <Button
               v-for="(btn, i) in buttons"
               :key="btn.key"
               :label="btn.label"
               class="text-2xl uppercase menu-btn"
               :class="{ active: activeKey === btn.key }"
               @click="btn.action"
               :ref="setItemRef(i)"
               tabindex="0"
            />
         </div>
      </div>
   </div>
   <slot v-else />
</template>

<script setup lang="ts">
import { Button } from "primevue";
import { ref, onErrorCaptured } from "vue";
import { useKeyboardMenu } from "../composables/useKeyboardMenu";

const hasError = ref(false);
const errorMessage = ref("Unknown error");

const { activeKey, setItemRef } = useKeyboardMenu(() => buttons);

const buttons = [
   {
      key: "retry",
      label: "Retry",
      action: () => {
         hasError.value = false;
         errorMessage.value = "Unknown error";
      },
   },
   {
      key: "reload",
      label: "Reload",
      action: () => {
         window.location.reload();
      },
   },
];

onErrorCaptured(err => {
   console.error("Caught by ErrorBoundary:", err);
   hasError.value = true;
   errorMessage.value = err instanceof Error ? err.message : String(err);

   return false;
});
</script>
<style scoped>
.fatal-error-wrapper {
   display: flex;
   justify-content: center;
   align-items: center;
   color: white;
   text-align: center;
}

.fatal-error-box {
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 2rem;
}

.fatal-title {
   color: #e83b06;
   font-size: 3rem;
}
</style>
