import type { kogaraFormValidator } from "./types";

export const minLengthValidator =
  (minLength: number, errorMessage: string): kogaraFormValidator<string | undefined> =>
  (val) =>
    val === null || val === undefined || val.length < minLength ? errorMessage : undefined;

export const maxLengthValidator =
  (maxLength: number, errorMessage: string): kogaraFormValidator<string | undefined> =>
  (val) =>
    val === null || val === undefined || val.length > maxLength ? errorMessage : undefined;

export const requiredValidator =
  (errorMessage: string): kogaraFormValidator<any | undefined> =>
  (val) =>
    val === null || val === undefined || (typeof val === "string" && !!val.length)
      ? errorMessage
      : undefined;

export const emailValidator =
  (errorMessage: string): kogaraFormValidator<string | undefined> =>
  (val) =>
    val === null || val === undefined || !_emailRegex.test(val) ? errorMessage : undefined;

// From https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
const _emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])/;
