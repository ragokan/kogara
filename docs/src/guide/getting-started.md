# Getting Started

## Installation

To install `Kogara`, you can use the following command:

<CodeGroup>
<CodeGroupItem title="pnpm" active>

```bash:no-line-numbers
pnpm install @kogara/core
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash:no-line-numbers
npm install @kogara/core
```

</CodeGroupItem>

<CodeGroupItem title="Yarn">

```bash:no-line-numbers
yarn add @kogara/core
```

</CodeGroupItem>

</CodeGroup>

## Register the plugin

```ts
import { KogaraPlugin } from "@kogara/core";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
// Register the plugin here
app.use(KogaraPlugin);
app.mount("#app");
```

## Create a store

Creating a store is very straightforward. You simply use Vue/reactivity methods and return the ones you want to expose.

```ts
import { defineStore } from "@kogara/core";
import { computed, ref } from "vue";

// Give store a name for devtools
export const useCounterStore = defineStore("counterStore", () => {
  // It is just a Vue ref
  const count = ref(0);

  // It is just a Vue computed
  const doubledCount = computed(() => count.value * 2);

  const increment = () => count.value++;

  return { count, doubledCount, increment };
});
```

## Use the store

```vue
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

Everything is that simple!
