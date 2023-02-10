import { _createDevtoolsApi } from "./devtools/createDevtoolsApi";
import { _devtoolsSenders } from "./devtools/helpers";
import { _watchCoreStore } from "./devtools/helpers/watchCoreStore";
import { KogaraInstance } from "./instance";
import type { KogaraDefineStoreOptions, KogaraStoreApi } from "./types";

export function defineStore<T extends object = {}>(
  id: string,
  setup: () => T,
  options?: KogaraDefineStoreOptions
) {
  function create() {
    const data = KogaraInstance.plugins.__scope.run(setup);

    const baseStore = { id, store: data } as KogaraStoreApi;

    // If dev mode
    if (process.env.NODE_ENV === "development") {
      // Check if data exists
      if (!data) {
        console.error(`[Kogara] defineStore's setup() must return an object for store "${id}"`);
      }

      // Create devtools api, tag and type
      baseStore.devtoolsApi = _createDevtoolsApi(id, data);
      baseStore.devtoolsTags = options?.devtoolsTags ?? [];
      baseStore.devtoolsTags.push("created");
      baseStore.devtoolsType = options?.devtoolsType ?? "core";

      // Then notify
      _devtoolsSenders.sendAll();

      // Remote created tag after 2 seconds
      setTimeout(() => {
        baseStore.devtoolsTags = baseStore.devtoolsTags.filter((tag) => tag !== "created");
        _devtoolsSenders.sendTree();
      }, 2000);

      _watchCoreStore<T>(data, baseStore);
    }

    return KogaraInstance.addStore(baseStore);
  }
  return () => KogaraInstance.getStore(id, create)!.store as T;
}
