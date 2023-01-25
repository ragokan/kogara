export const sleep = (duration = 1000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration));
