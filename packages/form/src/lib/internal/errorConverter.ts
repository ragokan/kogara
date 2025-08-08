import { z } from "zod";
import { KogaraFormErrors } from "../types";

export function _errorConverter<Values>(
  errors: z.ZodIssue[],
): KogaraFormErrors<Values> {
  const result: Record<any, any> = {};

  for (const error of errors) {
    const paths = error.path;

    // Normalize message for required errors coming from invalid_type
    let message = error.message;
    if (error.code === "invalid_type") {
      // Standardize invalid_type to Required in our error model
      message = "Required";
    }

    if (paths.length === 1) {
      result[paths[0]!] = message;
      continue;
    }

    const obj: Record<any, any> = {};

    for (let i = 1; i < paths.length; i++) {
      const path = paths[i]!;

      if (i === paths.length - 1) {
        obj[path] = message;
      } else {
        obj[path] = {};
      }
      const firstPath = paths[0]!;
      result[firstPath] = Object.assign({}, result[firstPath], obj);
    }
  }

  return result as KogaraFormErrors<Values>;
}
