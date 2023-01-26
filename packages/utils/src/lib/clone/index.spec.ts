import { describe, expect, it } from "vitest";
import { clone } from ".";

describe("simple clone test", () => {
  const original = {
    a: 1,
    b: "two",
    c: [1, 2, 3],
    d: { e: 1, f: 2 },
    e: new Date(),
    f: new Map([
      ["a", 1],
      ["b", 2],
    ]),
    g: new Set([1, 2, 3]),
  };
  const cloned = clone(original);

  it("checks if same", () => {
    expect(cloned === original).toBe(false);
    expect(cloned).not.toBe(original);
  });

  function areEqual() {
    expect(cloned).toEqual(original);
    expect(cloned).toMatchObject(original);
    expect(cloned).toStrictEqual(original);
    expect(JSON.stringify(cloned)).toBe(JSON.stringify(original));
  }

  function checkDeepEquality(key: keyof typeof original) {
    expect(cloned[key]).not.toBe(original[key]);
    expect(cloned[key]).toEqual(original[key]);
    expect(cloned[key]).toMatchObject(original[key]);
    expect(cloned[key]).toStrictEqual(original[key]);
  }

  it("checks equality", areEqual);
  it("checks deep equality - array", () => checkDeepEquality("c"));
  it("checks deep equality - object", () => checkDeepEquality("d"));
  it("checks deep equality - date", () => checkDeepEquality("e"));
  it("checks deep equality - map", () => checkDeepEquality("f"));
  it("checks deep equality - set", () => checkDeepEquality("g"));

  it("mutates a - primitive", () => (cloned.a = 2));
  it.fails("checks if primitive is cloned", areEqual);
  it.fails("checks if primitive is cloned", () => checkDeepEquality("a"));

  it("mutates b - primitive", () => (cloned.b = "three"));
  it.fails("checks if primitive is cloned", areEqual);
  it.fails("checks if primitive is cloned", () => checkDeepEquality("b"));

  it("mutates c - array", () => cloned.c.push(4));
  it.fails("checks if array is cloned", areEqual);
  it.fails("checks if array is cloned", () => checkDeepEquality("c"));

  it("mutates d - object", () => (cloned.d.e = 2));
  it.fails("checks if object is cloned", areEqual);
  it.fails("checks if object is cloned", () => checkDeepEquality("d"));

  it("mutates e - date", () => (cloned.e = new Date()));
  it.fails("checks if date is cloned", areEqual);
  it.fails("checks if date is cloned", () => checkDeepEquality("e"));

  it("mutates f - map", () => cloned.f.set("c", 3));
  it.fails("checks if map is cloned", areEqual);
  it.fails("checks if map is cloned", () => checkDeepEquality("f"));

  it("mutates g - set", () => cloned.g.add(4));
  it.fails("checks if set is cloned", areEqual);
  it.fails("checks if set is cloned", () => checkDeepEquality("g"));
});
