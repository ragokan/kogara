import { z } from "zod";

export type KogaraFormErrors<Values> = Values extends object
  ? {
      [P in keyof Values]?: KogaraFormErrors<Values[P]>;
    }
  : string;

export interface KogaraFormState<Values> {
  values: Values;
  errors: KogaraFormErrors<Values>;
}

export interface KogaraFormOptions<Values> {
  schema?: z.Schema<Values>;

  initialValues?: Partial<Values>;

  validateOnChange?: boolean;

  onSubmit?: (values: Values) => void | Promise<void>;

  onError?: (error: KogaraFormErrors<Values>) => void;
}
