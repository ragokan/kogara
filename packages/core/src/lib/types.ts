import type { DevtoolsPluginApi } from "@vue/devtools-api";
import { EffectScope } from "vue";

export interface KogaraDevtoolsApi {
  key: string;
  type: "ref" | "reactive" | "computed" | "other";
  value: any;
}

export type KogaraDevToolsType = "core" | "trpc";

export interface KogaraStoreApi<T = any> {
  id: string;
  store: T;
  devtoolsApi?: KogaraDevtoolsApi[];
  devtoolsType?: KogaraDevToolsType;
  devtoolsTag?: string;
}

export interface KogaraStores {
  [key: string]: KogaraStoreApi;
}

export interface KogaraPlugins {
  __devtoolsApi?: DevtoolsPluginApi<any>;
  __scope: EffectScope;
}

export interface KogaraDefineStoreOptions {
  devtoolsType?: KogaraDevToolsType;
}
