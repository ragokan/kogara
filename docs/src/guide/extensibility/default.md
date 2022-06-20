# Default Extensions

Kogara provides many default extensions for you to use easily with full devtools support.

## Installation

To use Kogara extensions, you firstly have to use the following command:

<CodeGroup>
<CodeGroupItem title="pnpm" active>

```bash:no-line-numbers
pnpm install @kogara/helpers
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash:no-line-numbers
npm install @kogara/helpers
```

</CodeGroupItem>

<CodeGroupItem title="Yarn">

```bash:no-line-numbers
yarn add @kogara/helpers
```

</CodeGroupItem>

</CodeGroup>

---

## hydratedRef

Creates a reactive reference that saves the value of the given object to the local storage whenever it changes.

```ts
import { hydratedRef } from "@kogara/helpers";
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
import { miniRef } from "@kogara/helpers";

const myArray = miniRef([1, 2, 3]);
myArray.value.push(4); // Doesn't trigger re-render
myArray.value[0] = 0; // Doesn't triggers re-render

myArray.value = [...myArray.value, 5]; // Triggers re-render
```
