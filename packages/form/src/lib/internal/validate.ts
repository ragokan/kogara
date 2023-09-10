import type { Ref } from "vue";
import { z } from "zod";
import type { KogaraFormErrors } from "../types";
import { _errorConverter } from "./errorConverter";

export function _validateForm<Values>(
  values: Ref<Values>,
  schema: z.Schema<Values>,
  errors: Ref<KogaraFormErrors<Values>>,
): boolean {
  const result = schema.safeParse(values.value);
  if (result.success) {
    errors.value = {} as KogaraFormErrors<Values>;
    return true;
  }
  // Disable because sometimes, when we are on *spec.ts* file, the error happens
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  errors.value = _errorConverter(result.error.errors);
  return false;
}
