import { effectScope, shallowReactive } from "vue";
import { kogaraDevtoolsID } from "./devtools/constants";
import type { KogaraPlugins, KogaraStoreApi, KogaraStores } from "./types";

class KogaraBase {
  private _stores: KogaraStores = process.env.NODE_ENV === "development" ? shallowReactive({}) : {};
  private _plugins: KogaraPlugins = { __scope: effectScope(true) };

  public get stores() {
    return this._stores;
  }

  public get plugins() {
    return this._plugins;
  }

  public addStore(store: KogaraStoreApi): KogaraStoreApi {
    return (this._stores[store.id] = store);
  }

  public getStore<T = any>(
    id: string,
    create?: () => KogaraStoreApi<T> | null | undefined
  ): KogaraStoreApi<T> | undefined | null {
    return this._stores[id] ?? create?.();
  }

  public disposeStore(id: string) {
    if (process.env.NODE_ENV === "development") {
      this.plugins.__devtoolsApi?.sendInspectorTree(kogaraDevtoolsID);
      this.plugins.__devtoolsApi?.sendInspectorState(kogaraDevtoolsID);
    }
    delete this._stores[id];
  }
}

export type IKogaraBase = Omit<KogaraBase, "_stores" | "_plugins">;
export const KogaraInstance: IKogaraBase = new KogaraBase();
