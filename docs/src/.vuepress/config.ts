import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  lang: "en-US",
  title: "Kogara",
  bundler: "@vuepress/bundler-vite",
  dest: "./dist",
  description: "Tiny and fast state management library for VueJS",
  theme: "@vuepress/theme-default",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/assets/images/icon.svg",
      },
    ],
  ],
  themeConfig: {
    logo: "/assets/images/icon.svg",
    darkMode: true,
    repo: "ragokan/kogara",
    navbar: [{ text: "Home", link: "/" }],
  },
  plugins: ["@vuepress/plugin-search", "@vuepress/plugin-back-to-top"],
});
