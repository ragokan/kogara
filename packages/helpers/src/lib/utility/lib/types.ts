export const isArray = (value: any): value is any[] => value && value instanceof Array;

export const isObject = (value: any): value is object => value && typeof value === "object" && !(value instanceof Array);

export const isFunction = (value: any): value is Function => value && typeof value === "function";
