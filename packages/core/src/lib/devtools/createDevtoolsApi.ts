import { isFunction } from "@kogara/utils";
import type { KogaraDevtoolsApi } from "../types";
import { _getType } from "../utilities/getType";
import { _addLog } from "./helpers/addLog";

export function _createDevtoolsApi(
  id: string,
  data: any,
): KogaraDevtoolsApi[] | undefined {
  if (process.env.NODE_ENV === "development") {
    // Base api for the store
    const devtoolsApi: KogaraDevtoolsApi[] = [];

    // We loop through all the properties of the store to learn their types and add to *devtoolsApi*
    Object.keys(data).forEach((key) => {
      const value = data[key];

      // Get type of *value* - Reactive variable or Other(most likely to be a function)
      const type = _getType(value);

      // Add to the api before making the changes to the functions
      devtoolsApi.push({ key, value, type });

      // If the type is a function, we change it to have logging function
      if (type === "other" && isFunction(value)) {
        const func = data[key] as Function;

        Object.defineProperty(data, key, {
          value(...args: any[]) {
            let functionResult: any;
            _addLog({ id, args, data, key, message: "started" });

            try {
              functionResult = func.apply(this, args);
            } catch (error) {
              _addLog({
                id,
                args,
                data,
                key,
                message: "failed",
                logType: "error",
                error: String(error ?? ""),
              });
              throw error;
            }

            if (functionResult instanceof Promise) {
              functionResult.then(() => {
                _addLog({ id, args, data, key, message: "ended" });
              });
            } else {
              _addLog({ id, args, data, key, message: "ended" });
            }

            return functionResult;
          },
        });
      }
    });
    return devtoolsApi;
  }
}
