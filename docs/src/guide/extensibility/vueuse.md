# VueUse

You can use all of VueUse methods with Kogara without any problem _(other than devtools issues in some cases)_.

```ts
import { defineStore } from "@kogara/core";
import { useStorage, watchOnce } from "@vueuse/core";

export const useCounterStore = defineStore("counterStore", () => {
  // It is just a VueUse state utility function.
  const count = useStorage("count", 0);

  // Or use other methods
  watchOnce(count, () => {
    // triggers only once
    console.log("count changed!");
  });

  // Expose it if you want
  return { count };
});
```
