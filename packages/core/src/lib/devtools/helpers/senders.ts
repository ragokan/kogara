import { KogaraInstance } from "../../instance";
import { kogaraDevtoolsID } from "../constants";

export const _devtoolsSenders = {
  sendState() {
    KogaraInstance.plugins.__devtoolsApi?.sendInspectorState(kogaraDevtoolsID);
  },
  sendTree() {
    KogaraInstance.plugins.__devtoolsApi?.sendInspectorTree(kogaraDevtoolsID);
  },
  sendAll() {
    this.sendState();
    this.sendTree();
  },
};
