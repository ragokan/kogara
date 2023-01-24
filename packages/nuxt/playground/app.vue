<template>
  <div>
    <p>Nuxt module playground!</p>
    <p>Count: {{ count }}</p>
    <p>Doubled Count: {{ doubledCount }}</p>
    <button @click="count++">Click me</button>
  </div>
</template>

<script setup lang="ts">
  import { KogaraInstance } from "@kogara/core";
  import { useCounterStore } from "./stores/counterStore";
  const { count, doubledCount } = useCounterStore();
  if (process.server) {
    console.log(useNuxtApp().payload.kogaraStores);
  }
</script>
