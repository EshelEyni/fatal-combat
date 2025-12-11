<template>
   <div class="flex flex-column align-items-center gap-3">
      <input
         v-for="(field, i) in formFields"
         :key="field.key"
         v-model="field.model.value"
         :type="field.type"
         :placeholder="field.placeholder"
         class="menu-input"
         :autofocus="i === 0"
      />

      <Button
         v-for="btn in buttons"
         :key="btn.key"
         :label="btn.label"
         class="text-3xl uppercase menu-btn"
         @click="btn.action"
      />
   </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "primevue/button";

const props = defineProps<{
   submitLabel: string;
   onSubmit: (credentials: { username: string; password: string }) => void;
   onBack: () => void;
}>();

const username = ref("");
const password = ref("");

const formFields = [
   { key: "username", model: username, type: "text", placeholder: "Username" },
   {
      key: "password",
      model: password,
      type: "password",
      placeholder: "Password",
   },
];

const buttons = computed(() => [
   {
      key: "submit",
      label: props.submitLabel,
      action: () =>
         props.onSubmit({
            username: username.value,
            password: password.value,
         }),
   },
   { key: "back", label: "Back", action: props.onBack },
]);
</script>
