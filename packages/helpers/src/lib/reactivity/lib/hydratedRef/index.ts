import { Ref, ref, shallowRef, watch } from "vue";
import { getKogaraStorage } from "../../../../bin/storage";
import { HydratedRefOptions } from "./types";

export function hydratedRef<T>(key: string, fallbackValue: T, options?: HydratedRefOptions): Ref<T>;

export function hydratedRef<T>(key: string): Ref<T | null>;

export function hydratedRef<T>(key: string, fallbackValue?: T, options: HydratedRefOptions = {}) {
  const { deep = true, shallow = false, onError = (error: any) => console.error(error) } = options;

  const storage = getKogaraStorage();

  const value = (shallow ? shallowRef : ref)(
    storage.getItem(key) ?? fallbackValue
  ) as Ref<T | null>;

  watch(
    value,
    (newValue) => {
      try {
        storage.setItem(key, newValue);
      } catch (error) {
        onError(error);
      }
    },
    { deep, flush: "post" }
  );

  return value;
}
