import { customRef } from "vue";

export function miniRef<T>(value: T) {
  return customRef<T>((track, trigger) => ({
    get() {
      track();
      return value;
    },
    set(newValue) {
      if (newValue === value) {
        return;
      }
      value = newValue;
      trigger();
    },
  }));
}
