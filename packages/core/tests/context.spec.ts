import { assert, describe, it } from "vitest";
import { InjectionKey, createApp, inject, ref } from "vue";
import { KogaraPlugin, defineStore } from "../src";

describe("context test", () => {
  const app = createApp({}).use(KogaraPlugin);

  const countKey = Symbol("count") as InjectionKey<number>;
  app.provide(countKey, 30);

  const useCounter = defineStore("counterStore", () => {
    const defaultCount = inject(countKey, 0);
    const count = ref(defaultCount);

    function increment() {
      count.value++;
    }

    function decrement() {
      count.value--;
    }

    return { count, increment, decrement };
  });

  it("increments", () => {
    const { count, increment } = useCounter();

    // It should be 30 because of the *countKey* injection
    assert.equal(count.value, 30);

    increment();

    assert.equal(count.value, 31);
  });

  it("decrements", () => {
    const { count, decrement } = useCounter();

    // it is 31 because of previous *increment* test
    assert.equal(count.value, 31);

    decrement();

    assert.equal(count.value, 30);
  });
});
