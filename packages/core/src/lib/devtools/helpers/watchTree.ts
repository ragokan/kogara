import { watch } from "vue";
import { KogaraInstance } from "../../instance";
import { kogaraDevtoolsID } from "../constants";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type DevtoolsApi = InstanceType<any>;

export function _watchTree(api: DevtoolsApi) {
  watch(KogaraInstance.stores, () => api.sendInspectorState(kogaraDevtoolsID), {
    deep: true,
    immediate: true,
  });
}
