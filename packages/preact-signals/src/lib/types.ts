interface BaseSignal<T> {
  (): T;
  get(): T;
  set(value: T): void;
  update(fn: (value: T) => T): void;
  subscribe: (fn: (value: T) => void) => () => void;
}

interface ObjectSignal<T extends object> extends BaseSignal<T> {
  mutate(fn: (value: T) => void): void;
  partial(maybeFn: ((value: T) => Partial<T>) | Partial<T>): void;
}

export type Signal<T> = T extends object ? ObjectSignal<T> : BaseSignal<T>;

export interface Computed<T> {
  (): T;
  get: () => T;
  subscribe: (fn: (value: T) => void) => () => void;
}
