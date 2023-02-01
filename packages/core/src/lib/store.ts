import { isReactive, isRef, watch } from "vue";
import { _createDevtoolsApi } from "./devtools/createDevtoolsApi";
import { _updateDevtoolsTags, _devtoolsSenders } from "./devtools/helpers";
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

      watch(
        // Watch only reactive and ref
        Object.values(data!).filter((v) => isRef(v) || isReactive(v)),
        (_, __, onCleanup) => {
          // Add updated tag and notify
          _updateDevtoolsTags(baseStore.devtoolsTags);
          _devtoolsSenders.sendTree();

          // Remove updated tag after 1 second
          const timeout = setTimeout(() => {
            baseStore.devtoolsTags = baseStore.devtoolsTags.filter(
              (tag) => !tag.startsWith("updated")
            );
            _devtoolsSenders.sendTree();
          }, 1000);

          // Clean the timeout if the watcher is stopped or re-run
          onCleanup(() => clearTimeout(timeout));
        },
        { deep: true }
      );
    }

    return KogaraInstance.addStore(baseStore);
  }
  return () => KogaraInstance.getStore(id, create)!.store as T;
}
