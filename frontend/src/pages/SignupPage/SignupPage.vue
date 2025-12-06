<script setup lang="ts">
import { useSignup } from "../../composables/auth/useSignup";
import { useRouter } from "vue-router";
import AuthForm from "../../components/AuthForm.vue";

const router = useRouter();
const { signup } = useSignup();

const handleSubmit = (cred: { username: string; password: string }) => {
   console.log(cred);

   signup(cred, {
      onSuccess: () => router.push("/"),
   });
};
</script>

<template>
   <AuthForm
      title="Signup"
      submitLabel="Signup"
      :onSubmit="handleSubmit"
      :onBack="() => router.push('/')"
   />
</template>
