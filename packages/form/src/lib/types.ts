export type kogaraFormValidator<T> = (value: T) => string | void | undefined | null;

export type kogaraFormErrors<Values> = { [key in keyof Values]?: string };

export interface kogaraFormOptions<Values> {
  validateOnChange?: boolean;

  initialValues?: Partial<Values>;

  onSubmit?: (values: Values) => void | Promise<void>;

  validators?: Validators<Values>;
}

type Validators<Values> = {
  [key in keyof Partial<Values>]?: kogaraFormValidator<Values[key]> | Array<kogaraFormValidator<Values[key]>>;
};

export interface kogaraFormState<Values> {
  values: Values;
  errors: kogaraFormErrors<Values>;
}
