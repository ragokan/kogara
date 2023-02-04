import { KogaraInstance, KogaraPlugin } from "@kogara/core";
import { defineNuxtPlugin } from "#app";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(KogaraPlugin);
  return {
    provide: {
      kogara: KogaraInstance
    }
  };
});
