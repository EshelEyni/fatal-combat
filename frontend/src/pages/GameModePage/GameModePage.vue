<template>
   <InviteMessagePopUp />

   <div class="flex flex-column align-items-center gap-3">
      <Button
         v-for="(btn, i) in buttons"
         :key="btn.key"
         :label="btn.label"
         class="text-3xl uppercase menu-btn"
         @click="btn.action"
         :class="{ active: activeKey === btn.key }"
         :ref="setItemRef(i)"
         tabindex="0"
      />
   </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import InviteMessagePopUp from "../../components/InviteMessagePopUp.vue";

import { useLoginWithToken } from "../../composables/auth/useLoginWithToken";
import { useKeyboardMenu } from "../../composables/useKeyboardMenu";
import Button from "primevue/button";
import { useRouter } from "vue-router";
const { loggedInUser } = useLoginWithToken();
const router = useRouter();

const isMultiplayer = ref(false);

const buttons = computed(() => {
   const goBackBtn = {
      key: "goback",
      label: "Go Back",
      action: () => {
         if (isMultiplayer.value) {
            isMultiplayer.value = false;
         } else {
            router.push("/");
         }
      },
   };

   const mainButtons = [
      {
         key: "multiplayer",
         label: "Multiplayer",
         action: () => {
            if (!loggedInUser.value) return router.push("/game-local");
            isMultiplayer.value = true;
         },
      },
      {
         key: "singlePlayer",
         label: "Singleplayer",
         action: () => router.push("/game-single"),
      },
      goBackBtn,
   ];

   const multiplayerButtons = [
      {
         key: "online",
         label: "Online",
         action: () => router.push("/game-online"),
      },
      {
         key: "local",
         label: "Local",
         action: () => router.push("/game-local"),
      },
      goBackBtn,
   ];

   return isMultiplayer.value ? multiplayerButtons : mainButtons;
});

const { activeKey, setItemRef } = useKeyboardMenu(() => buttons.value);
</script>
<style lang="scss" scoped></style>
