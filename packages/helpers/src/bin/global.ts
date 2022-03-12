const kogaraGlobal =
  typeof window !== "undefined"
    ? window
    : typeof globalThis !== "undefined"
    ? globalThis
    : typeof self !== "undefined"
    ? self
    : typeof global !== "undefined"
    ? global
    : {};

export const getKogaraGlobal = (): any => kogaraGlobal;
