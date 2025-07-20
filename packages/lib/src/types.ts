export type StringRecord = Record<string, string>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;

export type Selector<T, S = T> = (state: T) => S;

export const OBJECT_TYPES = {
  OBJECT: "object",
  ARRAY: "array",
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  NULL: "null",
  UNDEFINED: "undefined",
} as const;
