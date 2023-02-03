import { customRef } from "vue";

export function miniRef<T>(value: T) {
  return customRef((track, trigger) => ({
    get() {
      track();
      return value;
    },
    set(newValue: T) {
      if (newValue === value) {
        return;
      }
      value = newValue;
      trigger();
    },
  }));
}
