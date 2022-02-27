import { shallowReactive } from "vue";
import type { KogaraPlugins, KogaraStoreApi, KogaraStores } from "./types";

class KogaraBase {
  private _stores: KogaraStores = process.env.NODE_ENV === "development" ? shallowReactive({}) : {};
  private _plugins: KogaraPlugins = {};

  public get stores() {
    return this._stores;
  }

  public get plugins() {
    return this._plugins;
  }

  public addStore(store: KogaraStoreApi): KogaraStoreApi {
    return (this._stores[store.id] = store);
  }

  public getStore<T = any>(id: string, create?: () => KogaraStoreApi<T> | null): KogaraStoreApi<T> | undefined {
    return this._stores[id] ?? create?.();
  }

  public disposeStore(id: string) {
    if (process.env.NODE_ENV === "development") {
      this.plugins.__devtoolsApi?.sendInspectorTree("kogara");
      this.plugins.__devtoolsApi?.sendInspectorState("kogara");
    }
    delete this._stores[id];
  }
}

export const KogaraInstance = new KogaraBase();
