import {
  useComputed as useBaseComputed,
  useSignalEffect as useBaseSignalEffect,
} from "@preact/signals";
import { useMemo } from "preact/hooks";
import { signal } from "./vanilla";
import { Computed } from "./types";

export function useSignal<T>(value: T) {
  return useMemo(() => signal<T>(value), []);
}

export function useComputed<T>(compute: () => T): Computed<T> {
  const computed = useBaseComputed(compute);

  return useMemo(() => {
    function fn() {
      return computed.value;
    }

    fn.get = () => computed.peek();

    fn.subscribe = computed.subscribe;

    fn.perf = () => computed;

    return fn;
  }, []);
}

export { useBaseSignalEffect as useSignalEffect };
