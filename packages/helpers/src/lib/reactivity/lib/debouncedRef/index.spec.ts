import { describe, assert, it, expect } from "vitest";
import { ref } from "vue";
import { debouncedRef } from ".";
import { sleep } from "../../../utility";

describe("simple counter test", () => {
  const counter = ref(0);
  const debouncedCounter = debouncedRef(counter, 20);
  expect(debouncedCounter.value).toBe(0);

  it("increments", async () => {
    counter.value++;
    expect(counter.value).toBe(1);
    expect(debouncedCounter.value).toBe(0);

    // wait for debouncedCounter to update
    await sleep(21);
    expect(debouncedCounter.value).toBe(1);
    assert(debouncedCounter.value === counter.value);
  });
});
