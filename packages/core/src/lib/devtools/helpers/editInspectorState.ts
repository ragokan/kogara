import { isRef, type App } from "vue";
import { insert } from "@kogara/utils";
import { KogaraInstance } from "../../instance";
import { kogaraDevtoolsID } from "../constants";
import { _setReactiveDeep } from "../utilities";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type DevtoolsApi = InstanceType<any>;

export function _editInspectorState(api: DevtoolsApi, app: App<any>) {
  api.on.editInspectorState((payload: any) => {
    if (payload.inspectorId !== kogaraDevtoolsID || payload.app !== app) {
      return;
    }
    const { state, path, nodeId } = payload;
    const store = (KogaraInstance.stores as any)[nodeId]?.store as any;

    if (path[0] && isRef((store as any)[path[0]])) {
      insert(path, 1, "value");
    }
    _setReactiveDeep(store, state.value, path);
  });
}
