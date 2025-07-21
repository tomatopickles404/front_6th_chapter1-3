import type { DependencyList } from "react";
import { shallowEquals } from "../equals";
import { useRef } from "./useRef";

// useMemo -> 값의 참조를 유지한다. 의존성이 변경될 때만 새로운 참조를 반영한다.
export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{
    deps: DependencyList;
    value: T;
  } | null>(null);

  // 2. 현재 의존성과 이전 의존성 비교

  const sameDeps = _equals(ref.current?.deps, _deps);
  const refNull = ref.current === null;

  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  // 첫 렌더링에는 값이 변경되지 않는다.

  if (!sameDeps || refNull) {
    const value = factory();
    ref.current = {
      deps: _deps,
      value,
    };

    return value;
  }

  return ref.current!.value;
}
