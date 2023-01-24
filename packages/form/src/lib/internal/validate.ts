import type { Ref } from "vue";
import type { kogaraFormErrors, kogaraFormOptions, kogaraFormValidator } from "../types";

export const _validateForm = <Values>(
  values: Ref<Values>,
  errors: Ref<kogaraFormErrors<Values>>,
  validators: kogaraFormOptions<Values>
): boolean => {
  const validationErrors: kogaraFormErrors<any> = {};

  Object.entries(validators).forEach(
    (validator: [string, Array<kogaraFormValidator<any>> | kogaraFormValidator<any>]) => {
      const [key, validate] = validator;
      if (Array.isArray(validate)) {
        for (let index = 0; index < validate.length; index++) {
          const element = validate[index];
          const result = element?.((values.value as any)[key]);
          if (result) {
            validationErrors[key] = result;
            return;
          }
        }
      } else {
        const result = validate((values.value as any)[key]);
        if (result) {
          validationErrors[key] = result;
        }
      }
    }
  );

  errors.value = validationErrors;
  return Object.keys(validationErrors).length === 0;
};
