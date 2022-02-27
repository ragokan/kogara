import { KogaraInstance } from "../../instance";
import type { CustomInspectorNode, DevtoolsPluginApi } from "@vue/devtools-api";
import type { App } from "vue";
import { kogaraDevtoolsID } from "../constants";

export const _getInspectorTree = (api: DevtoolsPluginApi<any>, app: App<any>) => {
  api.on.getInspectorTree((payload) => {
    if (payload.inspectorId !== kogaraDevtoolsID || payload.app !== app) return;

    const nodes: CustomInspectorNode[] = [];

    const stores = Object.entries(KogaraInstance.stores).map(([, store]) => store);
    const globalStores = stores.filter(({ id }) => !id.startsWith("local:"));
    const localStores = stores.filter(({ id }) => id.startsWith("local:"));

    if (!!globalStores.length) {
      nodes.push({
        id: "stores",
        label: "Kogara Stores",
        children: globalStores.map(({ id }) => ({ id, label: id })),
      });
    }

    if (!!localStores.length) {
      nodes.push({
        id: "localStores",
        label: "Local Stores",
        children: localStores.map(({ id }) => ({ id, label: id })),
      });
    }

    if (!stores.length) {
      nodes.push({
        id: "noStores",
        label: "No Stores",
      });
    }

    payload.rootNodes = nodes;
  });
};
