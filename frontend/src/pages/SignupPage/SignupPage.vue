<template>
   <AuthForm
      submitLabel="Signup"
      :onSubmit="handleSubmit"
      :onBack="() => router.push('/')"
   />
</template>

<script setup lang="ts">
import { useSignup } from "../../composables/auth/useSignup";
import { useRouter } from "vue-router";
import AuthForm from "../../components/AuthForm.vue";

const router = useRouter();
const { signup } = useSignup();

const handleSubmit = (cred: { username: string; password: string }) => {
   signup(cred, {
      onSuccess: () => router.push("/"),
   });
};
</script>
