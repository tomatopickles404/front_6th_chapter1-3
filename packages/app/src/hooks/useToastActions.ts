import { useRef, useEffect, useMemo, useCallback } from "react";
import { debounce } from "../utils";
import { createActions } from "../components/toast/toastReducer";

const DEFAULT_DELAY = 3000;

type ToastAction =
  | { type: "show"; payload: { message: string; type?: "info" | "success" | "warning" | "error" } }
  | { type: "hide" };

type Dispatch = (action: ToastAction) => void;

export function useToastActions({ dispatch }: { dispatch: Dispatch }) {
  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const hideAfter = useRef(debounce(hide, DEFAULT_DELAY));

  useEffect(() => {
    hideAfter.current = debounce(hide, DEFAULT_DELAY);
  }, [hide]);

  const showWithHide = useCallback(
    (...args: Parameters<typeof show>) => {
      show(...args);
      hideAfter.current();
    },
    [show],
  );

  const actions = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);
  return actions;
}
