import { watch, WatchCallback, WatchOptions, WatchStopHandle, type WatchSource } from "vue";
import { debounce } from "../../../utility";

declare type MultiWatchSources = (WatchSource<unknown> | object)[];

declare type MapSources<T, Immediate> = {
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

export function debouncedWatch<T extends MultiWatchSources, Immediate extends Readonly<boolean> = false>(
  sources: [...T],
  cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  ms?: number,
  options?: WatchOptions<Immediate>
): WatchStopHandle;

export function debouncedWatch<T extends Readonly<MultiWatchSources>, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  ms?: number,
  options?: WatchOptions<Immediate>
): WatchStopHandle;

export function debouncedWatch<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  ms?: number,
  options?: WatchOptions<Immediate>
): WatchStopHandle;

export function debouncedWatch<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  ms?: number,
  options?: WatchOptions<Immediate>
): WatchStopHandle;

export function debouncedWatch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: any,
  ms = 200,
  options?: WatchOptions<Immediate>
) {
  const debouncedCallback = debounce(cb, ms);
  return watch<T, Immediate>(source as WatchSource<T>, debouncedCallback, options);
}
