import { defaultTheme, defineUserConfig } from "vuepress";
// import { searchPlugin } from "@vuepress/plugin-search";

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
      { text: "Docs", link: "/guide/getting-started" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          children: ["/guide/about", "/guide/getting-started"],
        },
        {
          text: "Nuxt.js",
          children: ["/guide/nuxt/introduction"],
        },
        {
          text: "Extensibility",
          children: [
            "/guide/extensibility/about",
            "/guide/extensibility/default",
            "/guide/extensibility/vueuse",
          ],
        },
        {
          text: "Form",
          children: ["/guide/form/introduction"],
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
  // plugins: [searchPlugin()],
});
