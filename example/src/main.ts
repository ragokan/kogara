import { KogaraPlugin } from "@kogara/core";
import { createApp } from "vue";
// Disable Vue error from TS extension
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import App from "./App.vue";

createApp(App).use(KogaraPlugin).mount("#app");
