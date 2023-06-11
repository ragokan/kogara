import { clone, isArray, isFunction } from "@kogara/utils";
import {
  batch as baseBatch,
  computed as baseComputed,
  effect as baseEffect,
  signal as baseSignal,
} from "@preact/signals";
import { Computed, Signal } from "./types";

export function signal<T>(value: T): Signal<T> {
  const base = baseSignal<T>(value);

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

  fn.set = (value: T) => set(value);

  fn.update = (fn: (value: T) => T) => set(fn(base.peek()));

  if (typeof value === "object") {
    if (value) {
      fn.mutate = (fn: (value: T) => void) => {
        const copy = clone(base.peek() as object);
        fn(copy as T);
        set(copy as T);
      };
    } else {
      fn.maybeMutate = (fn: (value: T) => void) => {
        const value = base.peek() as object | null;
        if (!value) {
          return;
        }
        const copy = clone(value);
        fn(copy as T);
        set(copy as T);
      };
    }

    if (!isArray(value)) {
      if (value) {
        fn.partial = (maybeFn: ((value: T) => Partial<T>) | Partial<T>) => {
          const current = base.peek();
          const part = isFunction(maybeFn) ? maybeFn(current) : maybeFn;
          set(Object.assign({}, current, part));
        };
      } else {
        fn.maybePartial = (
          maybeFn: ((value: T) => Partial<T>) | Partial<T>
        ) => {
          const current = base.peek();
          const part = isFunction(maybeFn) ? maybeFn(current) : maybeFn;
          set(Object.assign({}, current, part));
        };
      }
    }
  }

  fn.subscribe = base.subscribe.bind(base);

  fn.$ = base;

  // Cast to any to avoid TS error
  return fn as any as Signal<T>;
}

export function computed<T>(compute: () => T): Computed<T> {
  const base = baseComputed(compute);

  function fn() {
    return base.value;
  }

  fn.get = () => base.peek();

  fn.subscribe = base.subscribe.bind(base);

  fn.$ = base;

  return fn;
}

export { baseBatch as batch, baseEffect as effect };
