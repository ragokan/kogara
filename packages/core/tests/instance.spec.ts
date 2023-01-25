import { describe, assert, it, expect } from "vitest";
import { ref } from "vue";
import { defineStore, KogaraInstance } from "../src";

describe("simple counter test", () => {
  const useCounter = defineStore("counterStore", () => ({ count: ref(0) }));

  it("creates", () => {
    expect(KogaraInstance.stores).toEqual({});
    expect(Object.keys(KogaraInstance.stores).length).toBe(0);

    useCounter();

    expect(KogaraInstance.stores).not.toEqual({});
    expect(Object.keys(KogaraInstance.stores).length).toBe(1);
  });

  it("gets", () => {
    assert.equal(KogaraInstance.getStore("counterStore")?.id, "counterStore");
    assert.equal(KogaraInstance.getStore("counterStore")?.store, useCounter());
  });

  it("disposes", () => {
    KogaraInstance.disposeStore("counterStore");

    expect(KogaraInstance.stores).toEqual({});
    expect(Object.keys(KogaraInstance.stores).length).toBe(0);
    expect(KogaraInstance.getStore("counterStore")).toBeUndefined();
  });
});
