import { KogaraInstance } from "../../instance";
import type { DevtoolsPluginApi } from "@vue/devtools-api";
import { isRef, type App } from "vue";
import { kogaraDevtoolsID } from "../constants";
import { _setReactiveDeep } from "../utilities";

export const _editInspectorState = (api: DevtoolsPluginApi<any>, app: App<any>) => {
  api.on.editInspectorState((payload) => {
    if (payload.inspectorId !== kogaraDevtoolsID || payload.app !== app) return;
    const { state, path, nodeId } = payload;
    const store = KogaraInstance.stores[nodeId]?.store;

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
