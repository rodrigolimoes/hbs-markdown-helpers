export const isDate = (value: string | Date): boolean => {
  const date = Date.parse(value.toString());
  return date.toString() !== "NaN";
};

export const isBoolean = (value: unknown): boolean =>
  typeof value === "boolean";

export const isNumber = (value: unknown): boolean => typeof value === "number";

export const isArray = (value: unknown): boolean => Array.isArray(value);

export const isObjectArray = (value: Array<unknown> | unknown): boolean =>
  Array.isArray(value) && value.every((e) => typeof e === "object");

export const isString = (value: unknown) => typeof value === "string";
