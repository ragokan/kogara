import { NanoInstance } from "../../instance";
import type { DevtoolsPluginApi } from "@vue/devtools-api";
import { watch } from "vue";
import { nanoDevtoolsID } from "../constants";

export const _watchTree = (api: DevtoolsPluginApi<any>) => {
  const effects: object[] = [];
  Object.keys(NanoInstance.stores).forEach((key) =>
    NanoInstance.stores[key].devtoolsApi?.forEach((data) => {
      if (data.type === "other") return;
      effects.push(data.value);
    })
  );
  watch(effects, () => {
    api.sendInspectorTree(nanoDevtoolsID);
    api.sendInspectorState(nanoDevtoolsID);
  });
};
