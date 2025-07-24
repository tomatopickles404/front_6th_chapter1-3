/* eslint-disable react-refresh/only-export-components */
import {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  createContext,
  memo,
  type PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { createActions, initialState, toastReducer, type ToastType } from "./toastReducer";
import { debounce } from "../../utils";

type ShowToast = (message: string, type: ToastType) => void;
type Hide = () => void;

const ToastActionsContext = createContext<{
  show: ShowToast;
  hide: Hide;
}>({
  show: () => null,
  hide: () => null,
});

const ToastStateContext = createContext<{
  message: string;
  type: ToastType;
}>({
  ...initialState,
});

const DEFAULT_DELAY = 3000;

const useToastActionContext = () => useContext(ToastActionsContext);
const useToastStateContext = () => useContext(ToastStateContext);

export const useToastCommand = () => {
  const { show, hide } = useToastActionContext();
  return { show, hide };
};

export const useToastState = () => {
  const { message, type } = useToastStateContext();
  return { message, type };
};

export const ToastProvider = memo(({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const { show, hide } = useMemo(() => createActions(dispatch), [dispatch]);
  const visible = state.message !== "";
  const hideAfter = useRef(debounce(hide, DEFAULT_DELAY));

  useEffect(() => {
    hideAfter.current = debounce(hide, DEFAULT_DELAY);
  }, [hide]);

  const showWithHide = useCallback(
    (...args: Parameters<ShowToast>) => {
      show(...args);
      hideAfter.current();
    },
    [show, hideAfter],
  );

  const actions = useMemo(() => ({ show: showWithHide, hide }), [showWithHide, hide]);

  return (
    <ToastActionsContext value={actions}>
      <ToastStateContext value={state}>
        {children}
        {visible && createPortal(<Toast />, document.body)}
      </ToastStateContext>
    </ToastActionsContext>
  );
});
