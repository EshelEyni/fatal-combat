<template>
   <AuthForm
      submitLabel="Login"
      :onSubmit="handleSubmit"
      :onBack="() => router.push('/')"
   />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useLogin } from "../../composables/auth/useLogin";
import AuthForm from "../../components/AuthForm.vue";

const router = useRouter();
const { login } = useLogin();

const handleSubmit = (cred: { username: string; password: string }) => {
   login(cred, {
      onSuccess: () => {
         router.push("/");
      },
   });
};
</script>
