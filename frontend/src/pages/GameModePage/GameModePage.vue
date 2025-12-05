<template>
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
import { useLoginWithToken } from "../../composables/auth/useLoginWithToken";
import { useKeyboardMenu } from "../../composables/useKeyboardMenu";
import Button from "primevue/button";
const { loggedInUser } = useLoginWithToken();

const playerMode = ref(null as null | "multiplayer" | "singlePlayer");
const multiPlayerMode = ref(null as null | "local" | "online");

const isGameReady = ref(false);

const onSetGameMode = (mode: "multiplayer" | "singlePlayer") => {
  playerMode.value = mode;
};

const onSetMultiPlayerMode = (mode: "local" | "online") => {
  multiPlayerMode.value = mode;
  isGameReady.value = true;
};
const buttons = computed(() => {
  if (playerMode.value === "multiplayer") {
    if (loggedInUser.value) {
      return [
        {
          key: "local",
          label: "local",
          action: () => onSetMultiPlayerMode("local"),
        },
        {
          key: "online",
          label: "online",
          action: () => onSetMultiPlayerMode("online"),
        },
      ];
    }

    return [
      {
        key: "local",
        label: "local",
        action: () => onSetMultiPlayerMode("local"),
      },
    ];
  }

  return [
    {
      key: "multiplayer",
      label: "Multiplayer",
      action: () => onSetGameMode("multiplayer"),
    },
    {
      key: "singlePlayer",
      label: "Singleplayer",
      action: () => {
        onSetGameMode("singlePlayer");
        isGameReady.value = true;
      },
    },
  ];
});

const { activeKey, setItemRef } = useKeyboardMenu(() => buttons.value);
</script>
<style lang="scss" scoped></style>
