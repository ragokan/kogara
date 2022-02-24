import { setupDevtoolsPlugin, type PluginDescriptor } from "@vue/devtools-api";
import type { App } from "vue";
import { NanoInstance } from "../instance";
import { nanoDevtoolsID, nanoDevtoolsLabel, nanoDevtoolsPackageName } from "./constants";
import { _editInspectorState, _getInspectorState, _getInspectorTree, _watchTree } from "./helpers";

export const useNanoDevtools = (app: App) => {
  // if __VUE_PROD_DEVTOOLS__

  setupDevtoolsPlugin(
    { id: nanoDevtoolsID, label: nanoDevtoolsLabel, packageName: nanoDevtoolsPackageName, app } as PluginDescriptor,
    (api) => {
      // Add nano to devtools UI
      api.addInspector({ id: nanoDevtoolsID, label: nanoDevtoolsLabel, icon: "source" });
      api.addTimelineLayer({ id: nanoDevtoolsID, label: nanoDevtoolsLabel, color: 0xff725c });

      // Set global devtools api for NanoInstance
      NanoInstance.plugins.__devtoolsApi = api;

      // Watch changes and update devtools UI for nano
      _watchTree(api);

      // Devtools Tree
      _getInspectorTree(api, app);

      // Devtools State
      _getInspectorState(api, app);

      // Devtools Actions
      _editInspectorState(api, app);
    }
  );
};
