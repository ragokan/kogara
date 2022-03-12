import { describe, expect, it } from "vitest";
import { ref } from "vue";
import { debouncedWatch } from ".";
import { sleep } from "../../../utility";

describe("simple counter test", () => {
  const counter = ref(0);
  let debouncedCounter = 0;
  let triggerAmount = 0;

  expect(counter.value).toBe(debouncedCounter);

  debouncedWatch(
    counter,
    (c) => {
      debouncedCounter = c;
      triggerAmount++;
    },
    20
  );

  it("increments", async () => {
    counter.value++;

    expect(counter.value).toBe(1);
    expect(debouncedCounter).toBe(0);
    expect(triggerAmount).toBe(0);

    await sleep(21);

    expect(counter.value).toBe(1);
    expect(debouncedCounter).toBe(1);
    expect(triggerAmount).toBe(1);
  });

  it("increments many times", async () => {
    counter.value++;
    counter.value++;
    counter.value++;

    expect(counter.value).toBe(4);
    expect(debouncedCounter).toBe(1);
    expect(triggerAmount).toBe(1);

    await sleep(21);

    expect(counter.value).toBe(4);
    expect(debouncedCounter).toBe(4);
    expect(triggerAmount).toBe(2);
  });
});
