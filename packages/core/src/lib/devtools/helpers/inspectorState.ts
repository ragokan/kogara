import type { App } from "vue";
import { KogaraInstance } from "../../instance";
import { kogaraDevtoolsID } from "../constants";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type DevtoolsApi = InstanceType<any>;

// Minimal local shape compatible with v8 inspector state
interface StateItem {
  key: string;
  value: unknown;
  objectType?: string;
  editable?: boolean;
}
interface CustomInspectorState {
  state?: StateItem[];
  computed?: StateItem[];
  functions?: { key: string; value: unknown }[];
}

export function _getInspectorState(api: DevtoolsApi, app: App<any>) {
  api.on.getInspectorState((payload: any) => {
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

    if (refOrReactives.length) {
      state.state = refOrReactives.map((data: any) => {
        const isRef = data.type === "ref";
        return {
          key: data.key,
          value: isRef ? data.value.value : data.value,
          objectType: data.type,
          editable: isRef || data.type === "reactive",
        } as StateItem;
      });
    }
    if (computeds.length) {
      state.computed = computeds.map((data: any) => ({
        key: data.key,
        value: data.value.value,
        objectType: data.type,
      }));
    }

    if (functions.length) {
      state.functions = functions.map((data: any) => ({
        key: data.key,
        value: data.value,
      }));
    }

    payload.state = state as any;
  });
}
