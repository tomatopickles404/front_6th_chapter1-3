import { useState } from "react";

type Ref<T> = { current: T };

export function useRef<T>(initialValue: T): Ref<T | null> {
  const [ref] = useState<Ref<T>>(() => ({
    current: initialValue,
  }));

  return ref;
}
