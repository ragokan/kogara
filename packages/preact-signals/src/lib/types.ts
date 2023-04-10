interface BaseSignal<T> {
  (): T;
  get(): T;
  set(value: T): void;
  update(fn: (value: T) => T): void;
  subscribe: (fn: (value: T) => void) => () => void;
}

interface ObjectSignal<T extends object> extends BaseSignal<T> {
  mutate(fn: (value: T) => void): void;
}

interface RecordSignal<T extends object> extends ObjectSignal<T> {
  partial(maybeFn: ((value: T) => Partial<T>) | Partial<T>): void;
}

type RecordOrArraySignal<T extends object> = T extends Array<any>
  ? ObjectSignal<T>
  : RecordSignal<T>;

export type Signal<T> = BaseSignal<T> &
  (T extends object ? RecordOrArraySignal<T> : {});

export interface Computed<T> {
  (): T;
  get: () => T;
  subscribe: (fn: (value: T) => void) => () => void;
}
