import {
  useComputed as useBaseComputed,
  useSignalEffect as useBaseSignalEffect,
} from "@preact/signals";
import { useMemo } from "preact/hooks";
import { Maybe } from "@kogara/utils";
import { signal } from "./vanilla";
import { Computed } from "./types";

export function useSignal<T>(value: T extends Maybe<object> ? T | null : T) {
  return useMemo(() => signal<T>(value), []);
}

export function useComputed<T>(compute: () => T): Computed<T> {
  const computed = useBaseComputed(compute);

  return useMemo(() => {
    function fn() {
      return computed.value;
    }

    fn.get = () => computed.peek();

    fn.subscribe = computed.subscribe.bind(computed);

    fn.$ = computed;

    return fn;
  }, []);
}

function useSignalEffect(
  effect: () => void | (() => void),
  deps: Array<Computed<any> | Computed<any>>,
) {
  return useBaseSignalEffect(() => {
    for (const dep of deps) {
      dep();
    }
    return effect();
  });
}

export { useSignalEffect };
