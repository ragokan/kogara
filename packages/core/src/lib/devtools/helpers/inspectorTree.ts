import type { CustomInspectorNode, DevtoolsPluginApi, InspectorNodeTag } from "@vue/devtools-api";
import type { App } from "vue";
import { KogaraInstance } from "../../instance";
import { kogaraDevtoolsID } from "../constants";

export const _getInspectorTree = (api: DevtoolsPluginApi<any>, app: App<any>) => {
  api.on.getInspectorTree((payload) => {
    if (payload.inspectorId !== kogaraDevtoolsID || payload.app !== app) {
      return;
    }

    const nodes: CustomInspectorNode[] = [];

    const stores = Object.entries(KogaraInstance.stores).map(([, store]) => store);

    if (stores.length) {
      nodes.push({
        id: "stores",
        label: "Kogara Stores",
        children: stores.map(({ id }) => ({ id, label: id })),
        tags: [getTag(stores.length)],
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
function getTag(label: number | string): InspectorNodeTag {
  return {
    label: label.toString(),
    backgroundColor: 0x3ba776,
    textColor: 0x000000,
  };
}
