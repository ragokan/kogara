import { describe, expect, it } from "vitest";
import { getKogaraStorage } from "../../../../bin/storage";
import { hydratedRef } from ".";

describe("simple counter test", () => {
  const count = hydratedRef("count", 0);

  it("increments", () => {
    expect(count.value).toBe(0);
    count.value++;
    expect(count.value).toBe(1);
  });

  it("getsFromStorage", () => {
    const hydratedCount = hydratedRef<number>("count");
    expect(hydratedCount.value).toBe(1);
  });

  it("checksKogaraStorage", () => {
    const storage = getKogaraStorage();
    expect(storage.getItem("count")).toBe(1);
  });
});
