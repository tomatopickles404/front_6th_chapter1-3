import { isObject, isSame } from "../utils";
import { type ObjectType } from "../types";

export const shallowEquals = (a: unknown, b: unknown): boolean => {
  if (isSame(a, b)) return true;
  if (!isObject(a) || !isObject(b)) return false;

  const aRecord = a as ObjectType;
  const bRecord = b as ObjectType;
  const aKeys = Object.keys(aRecord);
  const bKeys = Object.keys(bRecord);

  if (aKeys.length !== bKeys.length) return false;

  // 4. 모든 키에 대해 얕은 비교 수행
  return aKeys.every((key) => aRecord[key] === bRecord[key]);
};
