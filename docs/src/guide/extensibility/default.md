# Default Extensions

Kogara provides many default extensions for you to use easily with full devtools support.

## Installation

To use Kogara extensions, you firstly have to use the following command:

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

---

## hydratedRef

Creates a reactive reference that saves the value of the given object to the local storage whenever it changes.

```ts
import { hydratedRef } from "@kogara/core";
const store = defineStore("my-store", () => {
  // Create the hydrated ref with a key and a default value.
  // If the key is not found in the local storage, the default value will be used.
  const count = hydratedRef("count", 0);

  count.value++; // Updates the value in the local storage, too.

  // Expose it if you want
  return { count };
});
```

## miniRef

miniRef is similar to shallowRef, but it is even more lightweight and does trigger re-render only when you set the value directly.

```ts
import { miniRef } from "@kogara/core";

const myArray = miniRef([1, 2, 3]);
myArray.value.push(4); // Doesn't trigger re-render
myArray.value[0] = 0; // Doesn't triggers re-render

myArray.value = [...myArray.value, 5]; // Triggers re-render
```

## debouncedRef

debouncedRef is similar to miniRef as being shallow, but it is also debounced.

```ts
import { debouncedRef } from "@kogara/core";

const myArray = debouncedRef([1, 2, 3], 100);
myArray.value.push(4); // Doesn't trigger re-render
myArray.value[0] = 0; // Doesn't triggers re-render

myArray.value = [...myArray.value, 5]; // Triggers re-render after 100ms
```

## debouncedWatch

debouncedWatch works just like the regular watch, but it is debounced.

```ts
import { debouncedWatch } from "@kogara/core";

const count = ref(0);

debouncedWatch(
  count, // or array of deps
  (newCount) => {
    console.log("count changed to", newCount);
  },
  100,
);

count.value++; // Triggers watch callback after 100ms
```
