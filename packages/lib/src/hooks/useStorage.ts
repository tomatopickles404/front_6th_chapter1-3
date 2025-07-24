import { useSyncExternalStore } from "react";
import type { createStorage } from "../createStorage";
import { useCallback } from "./useCallback";

type Storage<T> = ReturnType<typeof createStorage<T>>;

export const useStorage = <T>(storage: Storage<T>) => {
  const { subscribe, get } = storage;
  const getServerSnapshot = useCallback(() => get(), [get]);

  return useSyncExternalStore(subscribe, get, getServerSnapshot);
};
