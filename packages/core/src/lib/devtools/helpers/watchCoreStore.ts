import { watch, isRef, isReactive } from "vue";
import { KogaraStoreApi } from "../../types";
import { _devtoolsSenders } from "./senders";
import { _updateDevtoolsTags } from "./updateDevtoolsTags";

export function _watchCoreStore<T extends object = {}>(
  data: T | undefined,
  baseStore: KogaraStoreApi<any>
) {
  if (baseStore.devtoolsType !== "core") {
    return;
  }
  watch(
    // Watch only reactive and ref
    Object.values(data!).filter((v) => isRef(v) || isReactive(v)),
    (_, __, onCleanup) => {
      // Add updated tag and notify
      _updateDevtoolsTags(baseStore.devtoolsTags);
      _devtoolsSenders.sendTree();

      // Remove updated tag after 1 second
      const timeout = setTimeout(() => {
        baseStore.devtoolsTags = baseStore.devtoolsTags.filter((tag) => !tag.startsWith("updated"));
        _devtoolsSenders.sendTree();
      }, 2500);

      // Clean the timeout if the watcher is stopped or re-run
      onCleanup(() => clearTimeout(timeout));
    },
    { deep: true }
  );
}
