import { Kysely, type Compilable, type CompiledQuery } from "kysely";

declare const withDefaultBrand: unique symbol;
export type WithDefault<T> = (T | null) & {
  [withDefaultBrand]: true;
};

type Primitive = string | number | boolean;
type BaseParams = Record<string, Primitive | WithDefault<Primitive>>;

class _P<DV extends Primitive> {
  constructor(
    public readonly _: string,
    public readonly _d?: DV,
  ) {}
}

type CompilableOutput<MaybeCompilable> = MaybeCompilable extends Compilable<
  infer Output
>
  ? Output
  : never;

type ConvertParams<T> = {
  [K in keyof T as T[K] extends WithDefault<unknown>
    ? K
    : never]?: T[K] extends WithDefault<infer V> ? V : never;
} & {
  [K in keyof T as T[K] extends WithDefault<unknown> ? never : K]: T[K];
};

function param<T, V extends Primitive = any>(_: string, _d?: V) {
  return new _P(_, _d) as T;
}

class Executor<DB, O, PS extends BaseParams, FPS = ConvertParams<PS>> {
  constructor(
    private readonly db: Kysely<DB>,
    private readonly args: CompiledQuery<O>,
  ) {}

  async execute(params: FPS): Promise<O[]> {
    return (
      await this.db.executeQuery({
        sql: this.args.sql,
        query: this.args.query,
        parameters: this.args.parameters.map((p) =>
          p instanceof _P
            ? p._ in (params as object)
              ? (params as BaseParams)[p._]
              : p._d
            : p,
        ),
      })
    ).rows as O[];
  }

  async executeTakeFirst(params: FPS): Promise<O | undefined> {
    const r = await this.execute(params);
    return r.length > 0 ? r[0] : undefined;
  }

  async executeTakeFirstOrThrow(params: FPS): Promise<O> {
    const r = await this.execute(params);
    if (r.length === 0) {
      throw new Error("No results found!");
    }
    return r[0]!;
  }
}

export function wrapQuery<
  DB,
  // eslint-disable-next-line no-use-before-define
  QB extends Compilable<O>,
  O = CompilableOutput<QB>,
>(db: Kysely<DB>, qb: QB) {
  type P<PS extends BaseParams> = <K extends keyof PS, V = PS[K]>(
    ...args: PS[K] extends WithDefault<infer DV>
      ? [key: K, defaultValue: DV]
      : [key: K]
  ) => V;

  return {
    withParams: <PS extends BaseParams>(
      cb: (queryBuilder: QB, param: P<PS>) => Compilable<O>,
    ) => new Executor<DB, O, PS>(db, cb(qb, param as P<PS>).compile()),
  };
}
