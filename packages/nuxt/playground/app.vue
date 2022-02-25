<template>
  <div>
    <p>Nuxt module playground!</p>
    <p>Count: {{ count }}</p>
    <p>Doubled Count: {{ doubledCount }}</p>
    <button @click="count++">Click me</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "./stores/counterStore";

const { count, doubledCount, increment } = useCounterStore();
</script>
