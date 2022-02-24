import { isRef, type ComputedRef } from "vue";

export const _isComputed = <T>(value: ComputedRef<T> | unknown): value is ComputedRef<T> =>
  !!(isRef(value) && (value as any).effect);
