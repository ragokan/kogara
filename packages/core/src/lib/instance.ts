import type { KogaraPlugins, KogaraStoreApi, KogaraStores } from "./types";

class KogaraBase {
  private _stores: KogaraStores = {};
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

  public getStore(id: string, create?: () => KogaraStoreApi | null): KogaraStoreApi | undefined {
    return this._stores[id] ?? create?.();
  }

  public disposeStore(store: KogaraStoreApi) {
    delete this._stores[store.id];
  }
}

export const KogaraInstance = new KogaraBase();
