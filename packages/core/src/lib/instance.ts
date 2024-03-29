import { App, effectScope, shallowReactive } from "vue";
import { kogaraDevtoolsID } from "./devtools/constants";
import type { KogaraPlugins, KogaraStoreApi, KogaraStores } from "./types";

class KogaraBase {
  private _stores: KogaraStores =
    process.env.NODE_ENV === "development" ? shallowReactive({}) : {};

  private _plugins: KogaraPlugins = { __scope: effectScope(true) };
  private _app: App | undefined;

  public runWithContext<T>(fn: () => T) {
    if (process.env.NODE_ENV === "development" && !this._app) {
      console.warn(
        "[Kogara] It is recommended to use 'KogaraPlugin' to get full power of the library.",
      );
    }
    return this._app?.runWithContext?.(fn) ?? fn();
  }

  public initApp(app: App) {
    this._app = app;
    app.config.globalProperties.$kogara = this;
  }

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
    create?: () => KogaraStoreApi<T> | undefined,
  ): KogaraStoreApi<T> | undefined {
    return this._stores[id] ?? create?.();
  }

  public disposeStore(id: string) {
    delete this._stores[id];
    if (process.env.NODE_ENV === "development") {
      this.plugins.__devtoolsApi?.sendInspectorTree(kogaraDevtoolsID);
      this.plugins.__devtoolsApi?.sendInspectorState(kogaraDevtoolsID);
    }
  }
}

export type IKogaraBase = Omit<KogaraBase, "_stores" | "_plugins">;
export const KogaraInstance: IKogaraBase = new KogaraBase();
