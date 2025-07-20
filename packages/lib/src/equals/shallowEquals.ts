import { isObject } from "../utils";
import { type StringRecord } from "../types";

export const shallowEquals = (a: StringRecord, b: StringRecord) => {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (a === b) return true;

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (!isObject(a) || !isObject(b)) return false;

  // 3. 객체의 키 개수가 다른 경우 처리
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  // 4. 모든 키에 대해 얕은 비교 수행
  return aKeys.every((key) => a[key] === b[key]);
};
