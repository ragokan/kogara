import { _createDevtoolsApi } from "./devtools/createDevtoolsApi";
import { KogaraInstance } from "./instance";
import type { KogaraStoreApi } from "./types";

export const defineStore = <T extends object = {}>(id: string, setup: () => T) => {
  const create = () => {
    const data = KogaraInstance.plugins.__scope.run(setup);

    const baseStore: KogaraStoreApi = { id, store: data };

    // If dev mode
    if (process.env.NODE_ENV === "development") {
      // Check if data exists
      if (!data) {
        // eslint-disable-next-line no-console
        console.error(`[Kogara] defineStore's setup() must return an object for store "${id}"`);
      }

      baseStore.devtoolsApi = _createDevtoolsApi(id, data);
      baseStore.devtoolsType = "core";
      KogaraInstance.plugins.__devtoolsApi?.sendInspectorTree("kogara");
      KogaraInstance.plugins.__devtoolsApi?.sendInspectorState("kogara");
    }

    return KogaraInstance.addStore(baseStore);
  };
  return () => KogaraInstance.getStore(id, create)!.store as T;
};
