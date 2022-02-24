import { KogaraInstance } from "../../instance";
import type { DevtoolsPluginApi } from "@vue/devtools-api";
import { watch } from "vue";
import { kogaraDevtoolsID } from "../constants";

export const _watchTree = (api: DevtoolsPluginApi<any>) => {
  const effects: object[] = [];
  Object.keys(KogaraInstance.stores).forEach((key) =>
    KogaraInstance.stores[key].devtoolsApi?.forEach((data) => {
      if (data.type === "other") return;
      effects.push(data.value);
    })
  );
  watch(effects, () => {
    api.sendInspectorTree(kogaraDevtoolsID);
    api.sendInspectorState(kogaraDevtoolsID);
  });
};
