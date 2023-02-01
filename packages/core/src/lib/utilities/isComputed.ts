import { isRef, type ComputedRef } from "vue";

export function _isComputed<T>(value: ComputedRef<T> | unknown): value is ComputedRef<T> {
  return !!(isRef(value) && (value as any).effect);
}
