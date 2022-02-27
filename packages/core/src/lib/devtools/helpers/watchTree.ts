import type { DevtoolsPluginApi } from "@vue/devtools-api";
import { watch } from "vue";
import { KogaraInstance } from "../../instance";
import { kogaraDevtoolsID } from "../constants";

export const _watchTree = (api: DevtoolsPluginApi<any>) => {
  watch(KogaraInstance.stores, () => {
    api.sendInspectorTree(kogaraDevtoolsID);
    api.sendInspectorState(kogaraDevtoolsID);
  });
};
