import type { DevtoolsPluginApi } from "@vue/devtools-api";

export interface NanoStoreApi {
  id: string;
  store: any;
  devtoolsApi?: NanoDevtoolsApi[];
}

export interface NanoStores {
  [key: string]: NanoStoreApi;
}

export interface NanoPlugins {
  __devtoolsApi?: DevtoolsPluginApi<any>;
}

export interface NanoDevtoolsApi {
  key: string;
  type: "ref" | "reactive" | "computed" | "other";
  value: any;
}
