import { describe, expect, it } from "vitest";
import { createDependencyStore, dependency } from ".";

describe("simple dependency tests", () => {
  describe("depencency created only one", () => {
    const a = dependency(() => {
      let count = 0;
      return {
        get value() {
          return count++;
        },
      };
    });

    const b = dependency((get) => ({
      value: get(a).value + 1,
    }));

    const store = createDependencyStore();

    it("should get a", () => {
      expect(store.get(a)).toEqual({ value: 1 });
    });

    it("should get b", () => {
      expect(store.get(b).value).toEqual(3);
    });
  });

  describe("circular get", () => {
    const a = dependency((get) => ({
      value: 0,
      valueFromB: () => get(b).value,
    }));

    const b = dependency((get) => {
      const aDep = get(a);
      return {
        value: aDep.value + 1,
      };
    });

    const store = createDependencyStore();

    it("should get a", () => {
      expect(store.get(a)).toContain({ value: 0 });
    });

    it("should get b", () => {
      expect(store.get(b).value).toEqual(1);
    });

    it("should get a circular", () => {
      expect(store.get(a).valueFromB()).toEqual(1);
    });
  });
});
