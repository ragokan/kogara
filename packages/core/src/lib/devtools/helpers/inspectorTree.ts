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

    if (!stores.length) {
      nodes.push({
        id: "noStores",
        label: "No Stores Yet",
      });
      payload.rootNodes = nodes;
      return;
    }

    const coreStores = stores.filter((store) => store.devtoolsType === "core");
    if (coreStores.length) {
      nodes.push({
        id: "coreStores",
        label: "Kogara Stores",
        children: coreStores.map(({ id }) => ({ id, label: id })),
        tags: [getTag(coreStores.length)],
      });
    }

    const trpcStores = stores.filter((store) => store.devtoolsType === "trpc");
    if (trpcStores.length) {
      nodes.push({
        id: "trpcStores",
        label: "TRPC Stores",
        children: trpcStores.map(({ id }) => ({ id, label: id })),
        tags: [getTag(trpcStores.length)],
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
