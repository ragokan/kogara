import { getKogaraGlobal } from "../global";
import { createMockStorage } from "./createMockStorage";
import { IStorage } from "./types";

export function getKogaraStorage() {
  const storage: IStorage = (getKogaraGlobal().localStorage ??= createMockStorage());

  return {
    getItem: <T>(key: string): T | null => {
      const value = storage.getItem(key);
      if (value === null || value === undefined) {
        return null;
      }
      return JSON.parse(value).value as T;
    },
    setItem: <T>(key: string, value: T) => {
      if (value === null) {
        return storage.removeItem(key);
      }
      storage.setItem(key, JSON.stringify({ value }));
    },
  };
}
