import { WatchSource } from "vue";

// These types are from Vue core source code.

export type MultiWatchSources = (WatchSource<unknown> | object)[];

export type MapSources<T, Immediate> = {
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
