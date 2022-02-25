import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineNuxtModule, addPlugin } from "@nuxt/kit";

export interface ModuleOptions {
  addPlugin: Boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@kogara/nuxt",
    configKey: "kogara",
  },
  defaults: {
    addPlugin: true,
  },
  setup(options, nuxt) {
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);
    addPlugin(resolve(runtimeDir, "plugin"));
  },
});
