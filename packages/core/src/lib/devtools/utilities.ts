export const _setReactiveDeep = (object: any, value: any, path: string[]) => {
  const limit = path.length - 1;
  for (let i = 0; i < limit; ++i) {
    const key = path[i];
    if (!key) continue;
    object = object[key] ?? (object[key] = {});
  }
  const key = path[limit];
  if (!key) return;
  object[key] = value;
};
