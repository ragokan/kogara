import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports,
} from "@nuxt/kit";
import { fileURLToPath } from "url";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@kogara/nuxt",
    configKey: "kogara",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);

    nuxt.hook("prepare:types", ({ references }) => {
      references.push({ types: "@kogara/nuxt" });
    });

    addPlugin(resolve(runtimeDir, "plugin"));

    addImports([
      {
        from: "@kogara/core",
        name: "defineStore",
      },
    ]);
  },
});
