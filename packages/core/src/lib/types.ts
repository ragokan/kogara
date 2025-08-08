import { EffectScope } from "vue";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type DevtoolsApi = InstanceType<any>;

export interface KogaraDevtoolsApi {
  key: string;
  type: "ref" | "reactive" | "computed" | "other";
  value: any;
}

export type KogaraDevToolsType = "core" | "trpc";

export interface KogaraStoreApi<T = any> {
  id: string;
  store: T;
  devtoolsApi?: Array<KogaraDevtoolsApi>;
  devtoolsType: KogaraDevToolsType;
  devtoolsTags: Array<string>;
}

export interface KogaraStores {
  [key: string]: KogaraStoreApi;
}

export interface KogaraPlugins {
  __devtoolsApi?: DevtoolsApi;
  __scope: EffectScope;
}

export interface KogaraDefineStoreOptions {
  devtoolsType?: KogaraDevToolsType;
  devtoolsTags?: Array<string>;
}
