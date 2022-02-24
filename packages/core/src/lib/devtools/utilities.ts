export const _setReactiveDeep = (object: any, value: any, path: string[]) => {
  const limit = path.length - 1;
  for (let i = 0; i < limit; ++i) {
    const key = path[i];
    object = object[key] ?? (object[key] = {});
  }
  const key = path[limit];
  object[key] = value;
};
