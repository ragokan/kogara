import { defineStore } from "@kogara/core";
import { computed, ref } from "vue";

export const useCounterStore = defineStore("counterStore", () => {
  const count = ref(0);

  const doubledCount = computed(() => count.value * 2);

  const increment = () => count.value++;

  return { count, doubledCount, increment };
});
