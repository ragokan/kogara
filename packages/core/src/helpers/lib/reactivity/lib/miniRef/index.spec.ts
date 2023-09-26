import { describe, expect, it } from "vitest";
import { miniRef } from ".";

describe("simple counter test", () => {
  const counter = miniRef(0);
  expect(counter.value).toBe(0);

  it("increments", () => {
    counter.value++;

    expect(counter.value).toBe(1);
  });

  it("decrements", () => {
    counter.value--;

    expect(counter.value).toBe(0);
  });
});
