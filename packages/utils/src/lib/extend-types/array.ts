export const insert = <T>(array: T[], index: number, ...items: T[]) =>
  array.splice(index, 0, ...items);

export const getRandomElement = <T>(arr: Array<T>): T | undefined =>
  arr[Math.floor(Math.random() * arr.length)];
