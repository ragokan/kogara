import { defaultTheme, defineUserConfig } from "vuepress";
import { backToTopPlugin } from "@vuepress/plugin-back-to-top";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  lang: "en-US",
  title: "Kogara",
  dest: "./dist",
  description: "Tiny and fast state management library for VueJS",
  theme: defaultTheme({
    logo: "/assets/images/icon.svg",
    repo: "ragokan/kogara",
    navbar: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/guide/docs" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          children: ["/guide/about", "/guide/getting-started", "/guide/usage"],
        },
        {
          text: "Core Concepts",
          children: ["/guide/core-concepts/stores"],
        },
      ],
    },
  }),
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/assets/images/icon.svg",
      },
    ],
  ],
  plugins: [backToTopPlugin(), searchPlugin()],
});
