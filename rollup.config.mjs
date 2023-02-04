/* eslint-disable @typescript-eslint/no-var-requires */
import path from "path";
import ts from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

if (!process.env.TARGET) {
  throw new Error("TARGET package must be specified via --environment flag.");
}

const pkg = require(path.join(__dirname, "packages", process.env.TARGET, "package.json"));

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} ragokan
  * @license MIT
  */`;

let hasTSChecked = false;

const outputConfigs = {
  mjs: {
    file: pkg.module,
    format: "es",
  },
  cjs: {
    file: "dist/index.cjs",
    format: "cjs",
  },
  global: {
    file: pkg.unpkg,
    format: "iife",
  },
  browser: {
    file: "dist/index.esm-browser.js",
    format: "es",
  },
};

const packageBuilds = Object.keys(outputConfigs);
const packageConfigs = packageBuilds.map((buildName) =>
  createConfig(buildName, outputConfigs[buildName])
);

packageBuilds.forEach((buildName) => {
  if (buildName === "cjs") {
    packageConfigs.push(createProductionConfig(buildName));
  } else if (buildName === "global") {
    packageConfigs.push(createMinifiedConfig(buildName));
  }
});

export default packageConfigs;

/**
 * @param {string} buildName
 * @param {{ file: any; format?: any; sourcemap?: any; banner?: any; externalLiveBindings?: any; globals?: any; name?: any; }} output
 * @param {any[]} plugins
 */
function createConfig(buildName, output, plugins = []) {
  if (!output) {
    console.error(`Invalid format: "${buildName}"`);
    process.exit(1);
  }

  output.sourcemap = !!process.env.SOURCE_MAP;
  output.banner = banner;
  output.externalLiveBindings = false;
  output.globals = { vue: "Vue" };

  const isProductionBuild = /\.prod\.[cm]?js$/.test(output.file);
  const isGlobalBuild = buildName === "global";
  const isNodeBuild = output.file?.includes(".node.") || buildName === "cjs";

  if (isGlobalBuild) {
    output.name = "index";
  }

  const shouldEmitDeclarations = !hasTSChecked;

  const tsPlugin = ts({
    check: !hasTSChecked,
    tsconfig: path.join(path.resolve(), "tsconfig.json"),
    cacheRoot: path.join(path.resolve(), "node_modules/.rts2_cache"),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations,
        rootDir: "./src",
      },
      exclude: ["tests", "*.spec.ts"],
    },
  });
  hasTSChecked = true;

  const external = ["vue"];
  if (!isGlobalBuild && !(isProductionBuild && isNodeBuild)) {
    external.push("@vue/devtools-api");
  }

  const nodePlugins = [resolve(), commonjs()];

  return {
    input: "src/index.ts",
    external,
    plugins: [tsPlugin, ...nodePlugins, ...plugins],
    output,
  };
}

/**
 * @param {string} format
 */
function createProductionConfig(format) {
  const extension = format === "cjs" || format === "mjs" ? format : "js";
  const descriptor = format === "cjs" || format === "mjs" ? "" : `.${format}`;
  return createConfig(format, {
    file: `dist/index${descriptor}.prod.${extension}`,
    format: outputConfigs[format].format,
  });
}

/**
 * @param {string} format
 */
function createMinifiedConfig(format) {
  const terser = require("@rollup/plugin-terser");
  return createConfig(
    format,
    {
      file: `dist/index.${format}.prod.js`,
      format: outputConfigs[format].format,
    },
    [
      terser.default({
        module: /^esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
      }),
    ]
  );
}
