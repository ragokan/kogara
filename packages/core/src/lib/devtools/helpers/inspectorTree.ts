import type {
  CustomInspectorNode,
  DevtoolsPluginApi,
  InspectorNodeTag,
} from "@vue/devtools-api";
import type { App } from "vue";
import { KogaraInstance } from "../../instance";
import { kogaraDevtoolsID } from "../constants";

export function _getInspectorTree(api: DevtoolsPluginApi<any>, app: App<any>) {
  api.on.getInspectorTree((payload) => {
    if (payload.inspectorId !== kogaraDevtoolsID || payload.app !== app) {
      return;
    }

    const nodes: CustomInspectorNode[] = [];
    const stores = Object.entries(KogaraInstance.stores).map(
      ([, store]) => store,
    );

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
        children: coreStores.map(({ id, devtoolsTags }) => ({
          id,
          label: id.replace("Store", ""),
          tags: devtoolsTags.map((tag) => getTag(tag, 0xfff200)),
        })),
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
}
function getTag(
  label: number | string,
  backgroundColor = 0x3ba776,
): InspectorNodeTag {
  return {
    label: label.toString(),
    backgroundColor,
    textColor: 0x000000,
  };
}
