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

interface RecordSignal<T extends Record<any, any>> extends ObjectSignal<T> {
  partial(maybeFn: ((value: T) => Partial<T>) | Partial<T>): void;
}

export type Signal<T> = T extends object
  ? T extends Array<any>
    ? ObjectSignal<T>
    : RecordSignal<T>
  : BaseSignal<T>;

export interface Computed<T> {
  (): T;
  get: () => T;
  subscribe: (fn: (value: T) => void) => () => void;
}
