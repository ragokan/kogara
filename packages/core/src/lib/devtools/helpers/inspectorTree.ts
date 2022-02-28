import { KogaraInstance } from "../../instance";
import type { CustomInspectorNode, DevtoolsPluginApi } from "@vue/devtools-api";
import type { App } from "vue";
import { kogaraDevtoolsID } from "../constants";

export const _getInspectorTree = (api: DevtoolsPluginApi<any>, app: App<any>) => {
  api.on.getInspectorTree((payload) => {
    if (payload.inspectorId !== kogaraDevtoolsID || payload.app !== app) return;

    const nodes: CustomInspectorNode[] = [];

    const stores = Object.entries(KogaraInstance.stores).map(([, store]) => store);

    if (!!stores.length) {
      nodes.push({
        id: "stores",
        label: "Kogara Stores",
        children: stores.map(({ id }) => ({ id, label: id })),
      });
    } else {
      nodes.push({
        id: "noStores",
        label: "No Stores Yet",
      });
    }

    payload.rootNodes = nodes;
  });
};
