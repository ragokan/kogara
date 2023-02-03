// eslint-disable-next-line no-use-before-define
export type GetDependency = <T>(dependency: Dependency<T>) => T;

export type CreateFn<T> = (get: GetDependency) => T;

export interface Dependency<T> {
  id: symbol;
  create: CreateFn<T>;
}

export interface DependencyStore {
  get: GetDependency;
}

export function dependency<T>(create: CreateFn<T>): Dependency<T> {
  return {
    id: Symbol("Dependency ID"),
    create,
  };
}

export function createDependencyStore(): DependencyStore {
  const dependencies: Record<symbol, any> = {};

  function get<T>(dependency: Dependency<T>): T {
    return (dependencies[dependency.id] ??= dependency.create(get));
  }

  return { get };
}
