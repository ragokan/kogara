import { defineNuxtPlugin } from "#app";
import { KogaraPlugin } from "@kogara/core";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(KogaraPlugin);
});
