// src/composables/useKeyboardMenu.ts
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

export function useKeyboardMenu<T extends { key: string; action: () => void }>(
  items: () => T[]
) {
  const activeIndex = ref(0);

  const activeItem = computed(() => items()[activeIndex.value]);
  const activeKey = computed(() => activeItem.value?.key);

  const trigger = () => {
    activeItem.value?.action();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      activeIndex.value = (activeIndex.value + 1) % items().length;
    }

    if (e.key === "ArrowUp") {
      activeIndex.value =
        (activeIndex.value - 1 + items().length) % items().length;
    }

    if (e.key === "Enter") {
      trigger();
    }
  };

  onMounted(() => window.addEventListener("keydown", onKeyDown));
  onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown));

  return { activeIndex, activeKey, activeItem, trigger };
}
