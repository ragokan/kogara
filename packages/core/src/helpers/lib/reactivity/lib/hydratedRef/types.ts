export interface HydratedRefOptions {
  /**
   * Use deep option in watch method
   *
   * @default true
   */
  deep?: boolean;

  /**
   * Use shallowRef instead of ref
   *
   * @default false
   */
  shallow?: boolean;

  /**
   * On error callback
   *
   * @default () => console.error(error);
   */
  onError?: (error: unknown) => void;
}
