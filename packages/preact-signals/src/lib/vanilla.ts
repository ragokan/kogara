import { clone, isArray, isFunction } from "@kogara/utils";
import {
  signal as baseSignal,
  computed as baseComputed,
  effect as baseEffect,
  batch as baseBatch,
} from "@preact/signals";
import { Computed, Signal } from "./types";

export function signal<T>(value: T): Signal<T> {
  const base = baseSignal(value);

  function fn() {
    return base.value;
  }

  function set(value: T) {
    if (value === base.peek()) {
      return;
    }
    base.value = value;
  }

  fn.get = () => base.peek();

  fn.set = set;

  fn.update = (fn: (value: T) => T) => set(fn(base.peek()));

  if (typeof value === "object") {
    fn.mutate = (fn: (value: T) => void) => {
      const copy = clone(base.peek() as object);
      fn(copy as T);
      set(copy as T);
    };

    fn.partial = (maybeFn: ((value: T) => Partial<T>) | Partial<T>) => {
      const obj = isArray(value) ? [] : {};
      const current = base.peek();
      const part = isFunction(maybeFn) ? maybeFn(current) : maybeFn;
      set(Object.assign(obj, current, part));
    };
  }

  fn.subscribe = base.subscribe;

  return fn as Signal<T>;
}

export function computed<T>(compute: () => T): Computed<T> {
  const base = baseComputed(compute);

  function fn() {
    return base.value;
  }

  fn.get = () => base.peek();

  fn.subscribe = base.subscribe;

  return fn;
}

export { baseEffect as effect, baseBatch as batch };
