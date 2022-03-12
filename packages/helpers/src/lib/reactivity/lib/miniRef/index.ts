import { customRef } from "vue";

export const miniRef = <T>(value: T) =>
  customRef((track, trigger) => ({
    get() {
      track();
      return value;
    },
    set(newValue: T) {
      value = newValue;
      trigger();
    },
  }));
