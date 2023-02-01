export function isArray(value: any): value is any[] {
  return value && value instanceof Array;
}

export function isObject(value: any): value is object {
  return value && typeof value === "object" && !(value instanceof Array);
}

export function isFunction(value: any): value is Function {
  return value && typeof value === "function";
}
