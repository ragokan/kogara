import { setupDevtoolsPlugin, type PluginDescriptor } from "@vue/devtools-api";
import type { App } from "vue";
import { KogaraInstance } from "../instance";
import {
  kogaraDevtoolsID,
  kogaraDevtoolsLabel,
  kogaraDevtoolsPackageName,
} from "./constants";
import {
  _editInspectorState,
  _getInspectorState,
  _getInspectorTree,
  _watchTree,
} from "./helpers";

export function useKogaraDevtools(app: App) {
  if (process.env.NODE_ENV === "development") {
    setupDevtoolsPlugin(
      {
        id: kogaraDevtoolsID,
        label: kogaraDevtoolsLabel,
        packageName: kogaraDevtoolsPackageName,
        homepage: "https://kogara.vercel.app",
        app,
      } as PluginDescriptor,
      (api) => {
        // Add kogara to devtools UI
        api.addInspector({
          id: kogaraDevtoolsID,
          label: kogaraDevtoolsLabel,
          icon: "celebration",
        });
        api.addTimelineLayer({
          id: kogaraDevtoolsID,
          label: kogaraDevtoolsLabel,
          color: 0xff725c,
        });

        // Set global devtools api for KogaraInstance
        KogaraInstance.plugins.__devtoolsApi = api;

        // Watch changes and update devtools UI for kogara
        _watchTree(api);

        // Devtools Tree
        _getInspectorTree(api, app);

        // Devtools State
        _getInspectorState(api, app);

        // Devtools Actions
        _editInspectorState(api, app);
      }
    );
  }
}
