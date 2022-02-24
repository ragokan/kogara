import { NanoInstance } from "../../instance";
import type { DevtoolsPluginApi } from "@vue/devtools-api";
import type { App } from "vue";
import { nanoDevtoolsID } from "../constants";

export const _getInspectorTree = (api: DevtoolsPluginApi<any>, app: App<any>) => {
  api.on.getInspectorTree((payload) => {
    if (payload.inspectorId !== nanoDevtoolsID || payload.app !== app) return;
    payload.rootNodes = [
      {
        id: "stores",
        label: "Nano Stores",
        children: Object.keys(NanoInstance.stores).map((key) => {
          const id = NanoInstance.stores[key].id;
          return { id, label: id };
        }),
      },
    ];
  });
};
