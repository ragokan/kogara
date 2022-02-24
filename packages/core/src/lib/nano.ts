import { _createDevtoolsApi } from "./devtools/createDevtoolsApi";
import { NanoInstance } from "./instance";
import type { NanoStoreApi } from "./types";

export const defineStore = <T extends object = {}>(id: string, setup: () => T) => {
  const create = () => {
    const data = setup();

    // if !data && isDev -> throw error

    const baseStore: NanoStoreApi = { id, store: data };

    // if devtools is enabled, call these
    baseStore.devtoolsApi = _createDevtoolsApi(id, data);
    NanoInstance.plugins.__devtoolsApi?.sendInspectorTree("nano");

    return NanoInstance.addStore(baseStore);
  };
  return () => NanoInstance.getStore(id, create)!.store as T;
};
