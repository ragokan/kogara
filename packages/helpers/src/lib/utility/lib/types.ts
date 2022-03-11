export const isArray = (value: any): value is any[] => value && Array.isArray(value);

export const isObject = (value: any): value is object => value && typeof value === "object" && !Array.isArray(value);

export const isFunction = (value: any): value is Function => value && typeof value === "function";
