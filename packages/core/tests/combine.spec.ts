import { describe, assert, it } from "vitest";
import { computed, ref } from "vue";
import { defineStore } from "../src";

describe("simple combine test", () => {
  const useCounter = defineStore("counterStore", () => {
    const count = ref(0);

    const increment = () => count.value++;

    const countWithAge = computed(() => {
      const { age } = useAge();
      return count.value + age.value;
    });

    return { count, countWithAge, increment };
  });

  const useAge = defineStore("ageStore", () => {
    const age = ref(0);

    const increment = () => age.value++;

    return { age, increment };
  });

  it("increments count", () => {
    const { count, countWithAge, increment } = useCounter();

    assert.equal(count.value, 0);

    increment();

    assert.equal(count.value, 1);

    assert.equal(countWithAge.value, count.value);
  });

  it("increments age", () => {
    const { count, countWithAge } = useCounter();
    const { age, increment } = useAge();

    assert.equal(age.value, 0);

    increment();

    assert.equal(age.value, 1);

    assert.equal(countWithAge.value, count.value + age.value);
    assert.equal(countWithAge.value, 2);
  });
});
