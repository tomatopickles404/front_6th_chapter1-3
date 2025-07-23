import { type SetStateAction, useCallback, useState } from "react";
import { shallowEquals } from "../equals";

export const useShallowState = <T>(initialValue: T) => {
  const [state, setState] = useState(initialValue);

  const setStateWithShallowEquals = useCallback((value: SetStateAction<T>) => {
    if (isUpdater(value)) {
      setState((prev) => {
        const next = value(prev);
        return shallowEquals(prev, next) ? prev : next;
      });
      return;
    }

    if (shallowEquals(state, value)) {
      return;
    }

    setState(value);
  }, []);

  return [state, setStateWithShallowEquals] as const;
};

const isUpdater = <T>(value: SetStateAction<T>): value is (prev: T) => T => {
  return typeof value === "function";
};
