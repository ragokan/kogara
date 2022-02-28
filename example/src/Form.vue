<template>
  <div>
    <label for="name">Name</label>
    <input type="text" placeholder="name" v-model="values.name" />
    <p v-if="errors.name">{{ errors.name }}</p>
    <label for="age">Age</label>
    <input type="number" placeholder="age" v-model="values.age" />
    <p v-if="errors.age">{{ errors.age }}</p>
    <button @click="submit" :disabled="loading">{{ loading ? "Loading..." : "Submit" }}</button>
  </div>
</template>

<script setup lang="ts">
import { minLengthValidator, requiredValidator, useForm } from "@kogara/form";

const { values, errors, loading, submit } = useForm<{ name: string; age: number }>({
  initialValues: {
    name: "hey",
    age: 0,
  },
  onSubmit: async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log(values);
  },
  validators: {
    name: [requiredValidator("Required!"), minLengthValidator(4, "Min Length!")],
    age: [requiredValidator("Required!"), (v) => (v < 5 ? "Value cannot be smaller than 5!" : null)],
  },
});
</script>

<style scoped>
input {
  display: block;
  margin-top: 2px;
  margin-bottom: 5px;
}
</style>
