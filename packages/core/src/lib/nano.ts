import { _createDevtoolsApi } from "./devtools/createDevtoolsApi";
import { NanoInstance } from "./instance";
import type { NanoStoreApi } from "./types";

export const defineStore = <T extends object = {}>(id: string, setup: () => T) => {
  const create = () => {
    const data = setup();

    // Check if data exists
    if (process.env.NODE_ENV === "development" || __VUE_PROD_DEVTOOLS__) {
      if (!data) {
        console.error(`[Nano] defineStore's setup() must return an object for store "${id}"`);
      }
    }

    const baseStore: NanoStoreApi = { id, store: data };

    // If dev mode
    if (process.env.NODE_ENV === "development" || __VUE_PROD_DEVTOOLS__) {
      baseStore.devtoolsApi = _createDevtoolsApi(id, data);
      NanoInstance.plugins.__devtoolsApi?.sendInspectorTree("nano");
    }

    return NanoInstance.addStore(baseStore);
  };
  return () => NanoInstance.getStore(id, create)!.store as T;
};
