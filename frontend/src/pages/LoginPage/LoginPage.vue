<template>
  <div class="flex flex-column align-items-center">
    <h3 class="text-4xl font-bold mt-0 mb-3 title">Login</h3>
    <div class="flex flex-column align-items-center gap-3">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="menu-input"
        :class="{ active: activeField === 'username' }"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="menu-input"
        :class="{ active: activeField === 'password' }"
      />

      <Button
        label="Submit"
        class="text-3xl uppercase menu-btn"
        :class="{ active: activeField === 'submit' }"
        @click="onSubmit"
      />

      <Button
        label="Back"
        class="text-3xl uppercase menu-btn"
        :class="{ active: activeField === 'back' }"
        @click="goBack"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { useLogin } from "../../composables/auth/useLogin";

const router = useRouter();
const { login } = useLogin();

const username = ref("");
const password = ref("");

type Field = "username" | "password" | "submit" | "back";
const activeField = ref<Field>("username");

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

const fields: Field[] = ["username", "password", "submit", "back"];

const onKeyDown = (e: KeyboardEvent) => {
  const i = fields.indexOf(activeField.value);

  if (e.key === "ArrowDown") {
    activeField.value = fields[(i + 1) % fields.length] as Field;
  }

  if (e.key === "ArrowUp") {
    activeField.value = fields[
      (i - 1 + fields.length) % fields.length
    ] as Field;
  }

  if (e.key === "Enter") {
    if (activeField.value === "submit") onSubmit();
    if (activeField.value === "back") goBack();
  }
};

onMounted(() => window.addEventListener("keydown", onKeyDown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown));
</script>
