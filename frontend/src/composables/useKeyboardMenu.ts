import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";

export function useKeyboardMenu<T extends { key: string; action?: () => void }>(items: () => T[]) {
   const activeIndex = ref(0);
   const activeItem = computed(() => items()[activeIndex.value]);
   const activeKey = computed(() => activeItem.value?.key);

   const itemEls = ref<HTMLElement[]>([]);

   const setItemRef = (index: number) => (el: any) => {
      const dom: HTMLElement | null =
         el instanceof HTMLElement ? el : el?.$el instanceof HTMLElement ? el.$el : null;

      if (dom) itemEls.value[index] = dom;
   };

   const focusActive = async () => {
      itemEls.value[activeIndex.value]?.focus?.();
   };

   watch(activeIndex, focusActive);

   const trigger = () => {
      activeItem.value?.action?.();
   };

   const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
         activeIndex.value = (activeIndex.value + 1) % items().length;
      }

      if (e.key === "ArrowUp") {
         activeIndex.value = (activeIndex.value - 1 + items().length) % items().length;
      }

      if (e.key === "Enter") {
         e.preventDefault();
         trigger();
      }
   };

   onMounted(() => {
      window.addEventListener("keydown", onKeyDown);
      focusActive();
   });
   onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown));

   return { activeIndex, activeKey, activeItem, trigger, setItemRef };
}
