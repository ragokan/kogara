import type { KogaraDevtoolsApi } from "../types";
import { _getType } from "../utilities/getType";
import { _addLog } from "./helpers/addLog";
import { isFunction } from "@kogara/helpers";

export const _createDevtoolsApi = (id: string, data: any): KogaraDevtoolsApi[] | undefined => {
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
        // Do nothing for now
        // const func = Object.assign({}, data)[key] as Function;
        // Object.defineProperty(data, key, {
        //   value(...args: any[]) {
        //     let functionValue: any;
        //     _addLog({ id, args, data, key, message: "started" });
        //     try {
        //       // If the function returns a promise, we wait for it to resolve
        //       functionValue = func(args);
        //     } catch (error) {
        //       // We catch the error to add it to the timeline but we also throw it again, so that the behaviour does not change in the release
        //       _addLog({ id, args, data, key, message: "failed", logType: "error", error: String(error ?? "") });
        //       throw error;
        //     } finally {
        //       _addLog({ id, args, data, key, message: "ended" });
        //     }
        //     return functionValue;
        //   },
        // });
      }
    });
    return devtoolsApi;
  }
};
