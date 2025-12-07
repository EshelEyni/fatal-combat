<template>
   <div v-if="currentScreen === 'lobby'">
      <ul>
         <li v-for="user in onlineUsers" :key="user.id">{{ user.username }}</li>
      </ul>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOnlineUsersStore } from "../../store/users";
import { storeToRefs } from "pinia";
const onlineUsersStore = useOnlineUsersStore();
const { onlineUsers } = storeToRefs(onlineUsersStore);

const currentScreen = ref<"lobby" | "game">("lobby");
</script>

<style scoped>
.game-wrapper {
   position: relative;
   display: inline-block;
}
</style>
