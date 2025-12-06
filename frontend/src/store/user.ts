import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
   state: () => ({
      username: null as string | null,
      token: null as string | null,
   }),
});
