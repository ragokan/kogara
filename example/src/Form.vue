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
  import { useForm } from "@kogara/form";
  import { z } from "zod";

  const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    age: z.number().min(18, "You must be at least 18 years old"),
  });

  const { values, errors, loading, submit } = useForm({
    schema,
    initialValues: {
      name: "",
      age: 0,
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      console.log("valid", values);
    },
    onError: (errors) => {
      console.log(values.value);
      console.log(errors);
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
