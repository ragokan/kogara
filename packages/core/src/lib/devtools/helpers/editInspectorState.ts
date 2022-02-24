import { NanoInstance } from "../../instance";
import type { DevtoolsPluginApi } from "@vue/devtools-api";
import { isRef, type App } from "vue";
import { nanoDevtoolsID } from "../constants";
import { _setReactiveDeep } from "../utilities";

export const _editInspectorState = (api: DevtoolsPluginApi<any>, app: App<any>) => {
  api.on.editInspectorState((payload) => {
    if (payload.inspectorId !== nanoDevtoolsID || payload.app !== app) return;
    const { state, path, nodeId } = payload;
    const store = NanoInstance.stores[nodeId]?.store;

    if (path.length === 1) {
      const maybeRefPath = path[0];
      if (!isRef(store[maybeRefPath])) return;
      // maybeRefPath refers to ref value
      store[maybeRefPath].value = state.value;
    } else {
      _setReactiveDeep(store, state.value, path);
    }
  });
};
