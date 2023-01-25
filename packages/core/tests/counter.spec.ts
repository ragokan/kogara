import { describe, assert, it } from "vitest";
import { ref } from "vue";
import { defineStore } from "../src";

describe("simple counter test", () => {
  const useCounter = defineStore("counterStore", () => {
    const count = ref(0);

    const increment = () => count.value++;
    const decrement = () => count.value--;

    return { count, decrement, increment };
  });

  it("increments", () => {
    const { count, increment } = useCounter();

    assert.equal(count.value, 0);

    increment();

    assert.equal(count.value, 1);
  });

  it("decrements", () => {
    const { count, decrement } = useCounter();

    // it is 1 because of previous *increment* test
    assert.equal(count.value, 1);

    decrement();

    assert.equal(count.value, 0);
  });
});
