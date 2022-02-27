import { _createDevtoolsApi } from "./devtools/createDevtoolsApi";
import { KogaraInstance } from "./instance";
import type { KogaraStoreApi } from "./types";

export const defineStore = <T extends object = {}>(id: string, setup: () => T) => {
  const create = () => {
    const data = setup();

    // Check if data exists
    if (process.env.NODE_ENV === "development") {
      if (!data) {
        console.error(`[Kogara] defineStore's setup() must return an object for store "${id}"`);
      }
    }

    const baseStore: KogaraStoreApi = { id, store: data };

    // If dev mode
    if (process.env.NODE_ENV === "development") {
      baseStore.devtoolsApi = _createDevtoolsApi(id, data);
      KogaraInstance.plugins.__devtoolsApi?.sendInspectorTree("kogara");
    }

    return KogaraInstance.addStore(baseStore);
  };
  return () => KogaraInstance.getStore(id, create)!.store as T;
};
