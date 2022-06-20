# Kogara

## Tiny and fast state management library for VueJS

### For all docs, _[click here.](https://kogara.vercel.app)_

### Installation

To install `Kogara`, you can use the following command:

```
pnpm install @kogara/core
```

### Register the plugin

```ts
import { KogaraPlugin } from "@kogara/core";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
// Register the plugin here
app.use(KogaraPlugin);
app.mount("#app");
```

### Create a store

Creating a store is very straightforward. You simply use Vue/reactivity methods and return the ones you want to expose.

```ts
import { defineStore } from "@kogara/core";
import { computed, ref, watch } from "vue";

// Give store a name for devtools
export const useCounterStore = defineStore("counterStore", () => {
  // It is just a Vue ref
  const count = ref(0);

  // It is just a Vue computed
  const doubledCount = computed(() => count.value * 2);

  const increment = () => count.value++;

  // You can also use other reactivity functions here
  watch(count, (newCount) => {
    console.log(`Count changed to ${newCount}`);
  });

  return { count, doubledCount, increment };
});
```

### Use the store

```html
<template>
  <div>
    <h2>Kogara in Vue</h2>
    <p>Count: {{ count }}</p>
    <p>Doubled Count: {{ doubledCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts" setup>
  import { useCounterStore } from "./stores/counterStore";
  // You can destructure just like a regular object.
  const { count, doubledCount, increment } = useCounterStore();
</script>
```
