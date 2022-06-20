# Introduction

`@kogara/form` is a package that I created to help me with forms. Usage is, just like other packages, very simple.

## Install

<CodeGroup>
<CodeGroupItem title="pnpm" active>

```bash:no-line-numbers
pnpm install @kogara/form
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash:no-line-numbers
npm install @kogara/form
```

</CodeGroupItem>

<CodeGroupItem title="Yarn">

```bash:no-line-numbers
yarn add @kogara/form
```

</CodeGroupItem>

</CodeGroup>

## Usage

```vue
<script setup lang="ts">
import { useForm, minLengthValidator, requiredValidator } from "@kogara/form";

const { loading, submit, values, errors } = useForm<{ name: string; age: number }>({
  initialValues: {
    name: "",
    age: 0,
  },
  onSubmit: async (validatedValues) => {
    // sleep for a while to trigger fake loading
    await new Promise((resolve) => setTimeout(resolve, 100));
    // do something with validatedValues
    console.log(validatedValues);
  },
  validators: {
    name: minLengthValidator(5, "name is too short"),
    // we can use as many as validator we want, we can also create inline validators
    age: [requiredValidator("age is required"), (age) => (age > 50 ? "age is too old" : undefined)],
  },
});
</script>

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
```

# Detailed Example

You can check the detailed example by clicking [this](https://github.com/ragokan/kogara/blob/master/example/src/Form.vue)
