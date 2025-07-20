import { isObject, isSame } from "../utils";
import { type ObjectType } from "../types";

export const deepEquals = (a: unknown, b: unknown): boolean => {
  if (isSame(a, b)) return true;
  if (!isObject(a) || !isObject(b)) return false;

  // 깊은 비교
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    return a.every((value, index) => deepEquals(value, b[index]));
  }

  // 3. 객체의 키 개수가 다른 경우 처리
  const aRecord = a as ObjectType;
  const bRecord = b as ObjectType;
  const aKeys = Object.keys(aRecord);
  const bKeys = Object.keys(bRecord);

  if (aKeys.length !== bKeys.length) return false;

  // 4. 재귀적으로 각 속성에 대해 deepEquals 호출
  return aKeys.every((key) => deepEquals(aRecord[key], bRecord[key]));
};
