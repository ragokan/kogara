const _kogaraGlobal =
  typeof window !== "undefined"
    ? window
    : typeof globalThis !== "undefined"
    ? globalThis
    : typeof self !== "undefined"
    ? self
    : typeof global !== "undefined"
    ? global
    : {};

export function getKogaraGlobal(): Record<any, any> {
  return _kogaraGlobal;
}
