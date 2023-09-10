import type {
  CustomInspectorState,
  DevtoolsPluginApi,
} from "@vue/devtools-api";
import type { App } from "vue";
import { KogaraInstance } from "../../instance";
import { kogaraDevtoolsID } from "../constants";

export function _getInspectorState(api: DevtoolsPluginApi<any>, app: App<any>) {
  api.on.getInspectorState((payload) => {
    if (payload.inspectorId !== kogaraDevtoolsID || payload.app !== app) {
      return;
    }

    const { nodeId } = payload;
    const store = KogaraInstance.stores[nodeId];
    if (!store) {
      return;
    }

    const refOrReactives =
      store.devtoolsApi?.filter(
        (i) => i.type === "ref" || i.type === "reactive",
      ) ?? [];
    const computeds =
      store.devtoolsApi?.filter((i) => i.type === "computed") ?? [];
    const functions =
      store.devtoolsApi?.filter((i) => typeof i.value === "function") ?? [];
    const state: CustomInspectorState = {};

    // Add reactive values if they exist
    if (refOrReactives.length) {
      state.state = refOrReactives.map((data) => {
        const isRef = data.type === "ref";
        return {
          key: data.key,
          value: isRef ? data.value.value : data.value,
          objectType: data.type,
          editable: isRef || data.type === "reactive",
        };
      });
    }
    // Add computed variables if they exist
    if (computeds.length) {
      state.computed = computeds.map((data) => ({
        key: data.key,
        value: data.value.value,
        objectType: data.type,
      }));
    }

    // Add functions if they exist
    if (functions.length) {
      state.functions = functions.map((data) => ({
        key: data.key,
        value: data.value,
      }));
    }

    payload.state = state;
  });
}
