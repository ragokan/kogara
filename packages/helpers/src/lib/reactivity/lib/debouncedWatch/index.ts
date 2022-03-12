import { watch, WatchCallback, WatchOptions, type WatchSource } from "vue";
import { debounce } from "../../../utility";

type MultiWatchSources = (WatchSource<unknown> | object)[];

type MapSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V>
    ? Immediate extends true
      ? V | undefined
      : V
    : T[K] extends object
    ? Immediate extends true
      ? T[K] | undefined
      : T[K]
    : never;
};

export const debouncedWatch = <T extends MultiWatchSources>(
  sources: [...T],
  cb: WatchCallback<MapSources<T, false>>,
  ms = 200,
  options: WatchOptions
) => {
  const debouncedCallback = debounce(cb, ms);
  return watch(sources, debouncedCallback, options);
};
