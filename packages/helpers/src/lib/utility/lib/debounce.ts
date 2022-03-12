type ArgsType<T> = T extends (...args: infer U) => any ? U : never;

export const debounce = <T extends Function>(func: T, ms = 300) => {
  let timeout: NodeJS.Timeout;

  return (...args: ArgsType<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(args), ms);
  };
};
