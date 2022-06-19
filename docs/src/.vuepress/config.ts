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
    navbar: [{ text: "Home", link: "/" }],
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
