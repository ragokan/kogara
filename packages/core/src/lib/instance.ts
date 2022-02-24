import type { NanoPlugins, NanoStoreApi, NanoStores } from "./types";

class NanoBase {
  private _stores: NanoStores = {};
  private _plugins: NanoPlugins = {};

  public get stores() {
    return this._stores;
  }

  public get plugins() {
    return this._plugins;
  }

  public addStore(store: NanoStoreApi): NanoStoreApi {
    return (this._stores[store.id] = store);
  }

  public getStore(id: string, create?: () => NanoStoreApi | null): NanoStoreApi | undefined {
    return this._stores[id] ?? create?.();
  }

  public disposeStore(store: NanoStoreApi) {
    delete this._stores[store.id];
  }
}

export const NanoInstance = new NanoBase();
