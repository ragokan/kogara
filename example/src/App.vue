<template>
  <div>
    <p>Vue Example!</p>
    <p>Count: {{ count }}</p>
    <p>Doubled Count: {{ doubledCount }}</p>
    <button @click="increment">Click me</button>

    <!-- Just to show the stores -->
    <hr />
    <p>Kogara Stores</p>
    {{ $kogara?.stores }}
    <br />
    {{ $kogara?.stores?.counterStore?.store }}
    <br />
    <form-vue></form-vue>
  </div>
</template>

<script lang="ts" setup>
  import { miniRef } from "@kogara/helpers";
  import FormVue from "./Form.vue";
  import { useCounterStore } from "./stores/counterStore";
  import { watch } from "vue";

  const count = miniRef(0);
  watch(count, (newVal) => {
    console.log("val changed", newVal);
  });
  count.value = 1;

  function increment() {
    count.value++;
  }

  const { doubledCount } = useCounterStore();
</script>
