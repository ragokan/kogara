import { type IKogaraBase } from "@kogara/core";
declare module "#app" {
    interface NuxtApp {
        $kogara: IKogaraBase;
    }
}
declare module "vue" {
    interface ComponentCustomProperties {
        $kogara: IKogaraBase;
    }
}
declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $kogara: IKogaraBase;
    }
}
declare const _default: any;
export default _default;
