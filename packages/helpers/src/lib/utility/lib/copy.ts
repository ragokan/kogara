export const copy = <T extends object>(target: T, base: {} | [] = {}): T => Object.assign(base, target);
