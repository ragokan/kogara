export const insert = <T>(array: T[], index: number, ...items: T[]) =>
  array.splice(index, 0, ...items);
