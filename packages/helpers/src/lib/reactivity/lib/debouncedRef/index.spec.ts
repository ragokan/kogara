import { describe, expect, it } from "vitest";
import { debouncedRef } from ".";
import { sleep } from "../../../utility";

describe("simple counter test", () => {
  const counter = debouncedRef(0, 20);
  expect(counter.value).toBe(0);

  it("increments", async () => {
    counter.value++;
    expect(counter.value).toBe(0);

    await sleep(11);
    expect(counter.value).toBe(0);

    // wait for debouncedCounter to update
    await sleep(11);
    expect(counter.value).toBe(1);
  });
});
