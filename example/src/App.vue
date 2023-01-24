<template>
  <div>
    <p>Vue Example!</p>
    <p>Count: {{ count }}</p>
    <p>Doubled Count: {{ doubledCount }}</p>
    <button @click="increment">Click me</button>

    <!-- Just to show the stores -->
    <hr />
    <p>Kogara Stores</p>
    {{ $kogara.stores }}
    <br />
    {{ $kogara.stores.counterStore.store }}
  </div>
</template>

<script lang="ts" setup>
  import { useCounterStore } from "./stores/counterStore";

  const { count, doubledCount, increment } = useCounterStore();
</script>
