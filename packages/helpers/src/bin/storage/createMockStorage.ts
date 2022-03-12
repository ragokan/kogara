import { IStorage } from "./types";

export const createMockStorage = (): IStorage => {
  const storage: Record<string, string> = {};

  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => (storage[key] = value),
    removeItem: (key: string) => delete storage[key],
  };
};
