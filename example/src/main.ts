import { KogaraPlugin } from "@kogara/core";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).use(KogaraPlugin).mount("#app");
