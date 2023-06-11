import { Maybe, UnwrapMaybe } from "@kogara/utils";
import { type ReadonlySignal as PerfSignal } from "@preact/signals";

interface BaseSignal<T> {
  (): T;
  get(): T;
  set(value: T): void;
  update(fn: (value: T) => T): void;
  subscribe(fn: (value: T) => void): () => void;
  $: PerfSignal;
}

interface ObjectSignal<T extends object> extends BaseSignal<T> {
  mutate(fn: (value: NonNullable<T>) => void): void;
}

interface RecordSignal<T extends object> extends ObjectSignal<T> {
  partial(maybeFn: ((value: T) => Partial<T>) | Partial<T>): void;
}

interface MaybeRecordSignal<T extends object | null>
  extends BaseSignal<UnwrapMaybe<T>> {
  maybeMutate(
    fn: (value: NonNullable<T>) => void,
    otherwise?: (tryAgain: () => void) => void
  ): void;
  maybePartial(
    maybeFn: ((value: NonNullable<T>) => Partial<T>) | Partial<T>,
    otherwise?: (tryAgain: () => void) => void
  ): void;
}

type RecordOrArraySignal<T extends object> = T extends Array<any>
  ? ObjectSignal<T>
  : RecordSignal<T>;

export type Signal<T> = T extends Maybe<object>
  ? MaybeRecordSignal<T>
  : T extends object
  ? RecordOrArraySignal<T>
  : BaseSignal<T>;

export interface Computed<T> {
  (): T;
  get: () => T;
  subscribe: (fn: (value: T) => void) => () => void;
  $: PerfSignal;
}
