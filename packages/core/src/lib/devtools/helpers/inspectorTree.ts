import { KogaraInstance } from "../../instance";
import type { DevtoolsPluginApi } from "@vue/devtools-api";
import type { App } from "vue";
import { kogaraDevtoolsID } from "../constants";

export const _getInspectorTree = (api: DevtoolsPluginApi<any>, app: App<any>) => {
  api.on.getInspectorTree((payload) => {
    if (payload.inspectorId !== kogaraDevtoolsID || payload.app !== app) return;
    payload.rootNodes = [
      {
        id: "stores",
        label: "Kogara Stores",
        children: Object.keys(KogaraInstance.stores).map((key) => {
          const id = KogaraInstance.stores[key].id;
          return { id, label: id };
        }),
      },
    ];
  });
};
