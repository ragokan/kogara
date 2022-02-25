import { describe, assert, it } from "vitest";
import { defineStore } from "../src";
import { ref } from "vue";

describe("simple counter test", () => {
  const useCounter = defineStore("counterStore", () => {
    const counter = ref(0);

    const increment = () => counter.value++;
    const decrement = () => counter.value--;

    return { counter, decrement, increment };
  });

  it("increments", () => {
    const { counter, increment } = useCounter();

    assert.equal(counter.value, 0);

    increment();

    assert.equal(counter.value, 1);
  });

  it("decrements", () => {
    const { counter, decrement } = useCounter();

    // it is 1 because of previous *increment* test
    assert.equal(counter.value, 1);

    decrement();

    assert.equal(counter.value, 0);
  });
});
