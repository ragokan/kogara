import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineNuxtModule, addPlugin } from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@kogara/nuxt",
    configKey: "kogara",
    compatibility: {
      nuxt: "^3.0.0",
      bridge: false,
    },
  },
  setup(_, nuxt) {
    // @ts-ignore
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);
    addPlugin(resolve(runtimeDir, "plugin"));
  },
});
