import { z } from "zod";
import { KogaraFormErrors } from "../types";

export function _errorConverter<Values>(
  errors: z.ZodIssue[],
): KogaraFormErrors<Values> {
  // Object to store the final result
  const result: Record<any, any> = {};

  for (const error of errors) {
    // Current path
    const paths = error.path;

    // If there is only one path, it means that the error is not nested
    if (paths.length === 1) {
      result[paths[0]!] = error.message;
      continue;
    }

    // If there are multiple paths, it means that the error is nested
    const obj: Record<any, any> = {};

    for (let i = 1; i < paths.length; i++) {
      const path = paths[i]!;

      // If it is the last path, it means that the error is here
      if (i === paths.length - 1) {
        obj[path] = error.message;
      } else {
        // If it is not the last path, it means that the error is nested
        obj[path] = {};
      }
      const firstPath = paths[0]!;
      result[firstPath] = Object.assign({}, result[firstPath], obj);
    }
  }

  return result as KogaraFormErrors<Values>;
}
