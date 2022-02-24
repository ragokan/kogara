import type { DevtoolsPluginApi } from "@vue/devtools-api";

export interface KogaraStoreApi {
  id: string;
  store: any;
  devtoolsApi?: KogaraDevtoolsApi[];
}

export interface KogaraStores {
  [key: string]: KogaraStoreApi;
}

export interface KogaraPlugins {
  __devtoolsApi?: DevtoolsPluginApi<any>;
}

export interface KogaraDevtoolsApi {
  key: string;
  type: "ref" | "reactive" | "computed" | "other";
  value: any;
}
