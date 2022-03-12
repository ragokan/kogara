import { readonly, ref, Ref, watch } from "vue";
import { debounce } from "../../../utility";

interface DebouncedRefOptions {
  deep?: boolean;
}

export const debouncedRef = <T>(baseRef: Ref<T>, ms = 250, options: DebouncedRefOptions = {}) => {
  const { deep = true } = options;

  const debounced = ref(baseRef.value) as Ref<T>;

  const setter = debounce((newValue: T) => {
    debounced.value = newValue;
  }, ms);

  watch(baseRef, setter, { deep });

  return readonly(debounced);
};
