import { customRef } from "vue";

export function debouncedRef<T>(value: T, ms = 250) {
  let timeout: NodeJS.Timeout;

  return customRef<T>((track, trigger) => ({
    get() {
      track();
      return value;
    },
    set(newValue) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        value = newValue;
        trigger();
      }, ms);
    },
  }));
}
