# Introduction

Using Kogara with Nuxt is very easy.

## Installation

To install `Kogara` for Nuxt, you can use the following command:

<CodeGroup>
<CodeGroupItem title="pnpm" active>

```bash:no-line-numbers
pnpm install @kogara/core @kogara/nuxt
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash:no-line-numbers
npm install @kogara/core @kogara/nuxt
```

</CodeGroupItem>

<CodeGroupItem title="Yarn">

```bash:no-line-numbers
yarn add @kogara/core @kogara/nuxt
```

</CodeGroupItem>

</CodeGroup>

## Register the plugin in `nuxt.config.ts`

```ts
import { defineNuxtConfig } from "nuxt3";
import KogaraPlugin from "@kogara/nuxt";

export default defineNuxtConfig({
  modules: [KogaraPlugin],
});
```

## Usage

Now, it does auto import the `defineStore`, so you can use it without importing.

Currently the usage is same with the `@kogara/core` package. You can check it by clicking [this](/guide/getting-started.md#create-a-store).
