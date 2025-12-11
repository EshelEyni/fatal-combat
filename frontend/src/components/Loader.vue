<template>
   <img :src="LoaderImage" alt="Loading..." />
</template>
<script setup lang="ts">
import LoaderImage from "/images/android-chrome-512x512.png";
</script>
<style scoped>
.loader {
   border: 16px solid #f3f3f3;
   border-top: 16px solid #3498db;
   border-radius: 50%;
   width: 120px;
   height: 120px;
   animation: spin 2s linear infinite;
}
</style>
