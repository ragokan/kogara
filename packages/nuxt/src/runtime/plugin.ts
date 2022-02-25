// @ts-ignore
import { defineNuxtPlugin } from "#app";
import { KogaraInstance, KogaraPlugin } from "@kogara/core";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(KogaraPlugin);

  return {
    provider: {
      kogara: KogaraInstance,
    },
  };
});
