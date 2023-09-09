import { KogaraInstance, type IKogaraBase, KogaraPlugin } from "@kogara/core";
import { defineNuxtPlugin } from "#app";

declare module "#app" {
  interface NuxtApp {
    $kogara: IKogaraBase;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $kogara: IKogaraBase;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $kogara: IKogaraBase;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(KogaraPlugin);

  return {
    provide: {
      kogara: KogaraInstance,
    },
  };
});
