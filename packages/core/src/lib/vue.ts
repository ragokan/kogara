import type { Plugin } from "vue";
import { useKogaraDevtools } from "./devtools/devtools";
import { KogaraInstance } from "./instance";

declare module "vue" {
  interface ComponentCustomProperties {
    $kogara: typeof KogaraInstance;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $kogara: typeof KogaraInstance;
  }
}

export const KogaraPlugin: Plugin = {
  install(app) {
    KogaraInstance.initApp(app);

    if (process.env.NODE_ENV === "development") {
      useKogaraDevtools(app);
    }
  },
};
