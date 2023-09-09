export const useCounterStore = defineStore("counterStore", () => {
  const count = ref(0);

  const doubledCount = computed(() => count.value * 2);

  return { count, doubledCount };
});
