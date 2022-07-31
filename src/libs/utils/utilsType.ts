export const isDate = (value: string | Date): boolean => {
  const date = Date.parse(value.toString());
  return date.toString() !== "NaN";
};

export const isBoolean = (value: unknown): boolean =>
  typeof value === "boolean";

export const isNumber = (value: unknown): boolean => typeof value === "number";
