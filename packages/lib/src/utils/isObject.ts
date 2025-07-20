import { OBJECT_TYPES } from "../types";

export const isObject = (value: unknown) => value !== null && typeof value === OBJECT_TYPES.OBJECT;
