<template>
  <div class="flex flex-column align-items-center">
    <h3 class="text-4xl font-bold mt-0 mb-3 title">Login</h3>
    <div class="flex flex-column align-items-center gap-3">
      <input
        v-for="(field, i) in formFields"
        :key="field.key"
        v-model="field.model.value"
        :type="field.type"
        :placeholder="field.placeholder"
        class="menu-input"
        :class="{ active: activeKey === field.key }"
        :ref="setItemRef(i)"
        tabindex="0"
        autofocus
      />

      <Button
        v-for="(btn, i) in buttons"
        :key="btn.key"
        :label="btn.label"
        class="text-3xl uppercase menu-btn"
        :class="{ active: activeKey === btn.key }"
        @click="btn.action"
        :ref="setItemRef(formFields.length + i)"
        tabindex="0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { useLogin } from "../../composables/auth/useLogin";
import { useKeyboardMenu } from "../../composables/useKeyboardMenu";

const router = useRouter();
const { login } = useLogin();

const username = ref("");
const password = ref("");

const onSubmit = () => {
  login(
    { username: username.value, password: password.value },
    {
      onSuccess: () => {
        router.push("/");
      },
    }
  );
};

const goBack = () => {
  router.push("/");
};

const formFields = [
  {
    key: "username",
    model: username,
    type: "text",
    placeholder: "Username",
  },
  {
    key: "password",
    model: password,
    type: "password",
    placeholder: "Password",
  },
];

const buttons = [
  { key: "submit", label: "Submit", action: onSubmit },
  { key: "back", label: "Back", action: goBack },
];

const { activeKey, setItemRef } = useKeyboardMenu(() => [
  ...formFields,
  ...buttons,
]);
</script>
