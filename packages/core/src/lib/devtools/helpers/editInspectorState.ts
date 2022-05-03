import { KogaraInstance } from "../../instance";
import type { DevtoolsPluginApi } from "@vue/devtools-api";
import { isRef, type App } from "vue";
import { kogaraDevtoolsID } from "../constants";
import { _setReactiveDeep } from "../utilities";
import { insert } from "@kogara/helpers";

export const _editInspectorState = (api: DevtoolsPluginApi<any>, app: App<any>) => {
  api.on.editInspectorState((payload) => {
    if (payload.inspectorId !== kogaraDevtoolsID || payload.app !== app) return;
    const { state, path, nodeId } = payload;
    const store = KogaraInstance.stores[nodeId]?.store;

    // path[0] is the target. if it is a ref, we need to add the *value* getter
    if (path[0] && isRef(store[path[0]])) {
      insert(path, 1, "value");
    }
    _setReactiveDeep(store, state.value, path);
  });
};
