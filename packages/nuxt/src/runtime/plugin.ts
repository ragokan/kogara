// @ts-ignore
import { defineNuxtPlugin } from "#app";
import { KogaraInstance, KogaraPlugin } from "@kogara/core";

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

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(KogaraPlugin);

  return {
    provider: {
      kogara: KogaraInstance,
    },
  };
});
