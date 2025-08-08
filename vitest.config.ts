import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  test: {
    include: ["**/*spec.ts"],
    watch: false,
  },
  resolve: {
    alias: {
      "@kogara/utils": fileURLToPath(new URL("./packages/utils/src/index.ts", import.meta.url)),
      "@kogara/core": fileURLToPath(new URL("./packages/core/src/index.ts", import.meta.url)),
      "@kogara/form": fileURLToPath(new URL("./packages/form/src/index.ts", import.meta.url)),
    },
  },
});
