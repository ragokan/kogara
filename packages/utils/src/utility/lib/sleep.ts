export const sleep = (duration: number = 1000): Promise<void> => new Promise((resolve) => setTimeout(resolve, duration));
