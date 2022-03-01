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

    // path[0] is the target. if it is a ref, we need to add the *value* getter
    if (isRef(store[path[0]])) {
      path.splice(1, 0, "value");
    }
    _setReactiveDeep(store, state.value, path);
  });
};
