import {
  isDate,
  isBoolean,
  isNumber,
  isArray,
  isObjectArray,
  isString,
} from "../../../src/libs/utils";

describe("Utils Type", () => {
  describe("Utils Date", () => {
    it("Should return false when the value is not an isoDate", async () => {
      const isDateType = isDate("abcd");

      expect(isDateType).toBeDefined();
      expect(isDateType).toEqual(false);
    });

    it("Should return true when the value is an isoDate", () => {
      const isDateType = isDate("2000-09-01");

      expect(isDateType).toBeDefined();
      expect(isDateType).toEqual(true);
    });

    it("Should return true when the value is a Date", () => {
      const isDateType = isDate(new Date());

      expect(isDateType).toBeDefined();
      expect(isDateType).toEqual(true);
    });
  });

  describe("Utils Boolean", () => {
    it("Should return true when the value is true", () => {
      const isBooleanType = isBoolean(true);

      expect(isBooleanType).toBeDefined();
      expect(isBooleanType).toEqual(true);
    });

    it("Should return true when value is false", () => {
      const isBooleanType = isBoolean(false);

      expect(isBooleanType).toBeDefined();
      expect(isBooleanType).toEqual(true);
    });

    it("Should return false when value is undefined", () => {
      const isBooleanType = isBoolean(undefined);

      expect(isBooleanType).toBeDefined();
      expect(isBooleanType).toEqual(false);
    });

    it("Should return false when value is string type", () => {
      const isBooleanType = isBoolean("shjgsdh");

      expect(isBooleanType).toBeDefined();
      expect(isBooleanType).toEqual(false);
    });

    it("Should return false when value is array type", () => {
      const isBooleanType = isBoolean([true, false]);

      expect(isBooleanType).toBeDefined();
      expect(isBooleanType).toEqual(false);
    });

    it("Should return false when value is null", () => {
      const isBooleanType = isBoolean(null);

      expect(isBooleanType).toBeDefined();
      expect(isBooleanType).toEqual(false);
    });

    it("Should return false when value is a number", () => {
      const isBooleanType = isBoolean(12);

      expect(isBooleanType).toBeDefined();
      expect(isBooleanType).toEqual(false);
    });
  });

  describe("Utils Number", () => {
    it("Should return true when value is a number", () => {
      const isNumberType = isNumber(12);

      expect(isNumberType).toBeDefined();
      expect(isNumberType).toEqual(true);
    });

    it("Should return false when value is a string", () => {
      const isNumberType = isNumber("ghgdhs");

      expect(isNumberType).toBeDefined();
      expect(isNumberType).toEqual(false);
    });

    it("Should return false when value is undefined", () => {
      const isNumberType = isNumber(undefined);

      expect(isNumberType).toBeDefined();
      expect(isNumberType).toEqual(false);
    });

    it("Should return false when value is null", () => {
      const isNumberType = isNumber(null);

      expect(isNumberType).toBeDefined();
      expect(isNumberType).toEqual(false);
    });

    it("Should return false when value is an array", () => {
      const isNumberType = isNumber([1, 2, 3]);

      expect(isNumberType).toBeDefined();
      expect(isNumberType).toEqual(false);
    });

    it("Should return false when value is an object", () => {
      const isNumberType = isNumber({ name: "Rodrigo", age: 23 });

      expect(isNumberType).toBeDefined();
      expect(isNumberType).toEqual(false);
    });
  });

  describe("Utils Array", () => {
    it("Should return true when value is an array", () => {
      const isArrayType = isArray(["rodrigo"]);

      expect(isArrayType).toBeDefined();
      expect(isArrayType).toEqual(true);
    });

    it("Should return false when value is null", () => {
      const isArrayType = isArray(null);

      expect(isArrayType).toBeDefined();
      expect(isArrayType).toEqual(false);
    });

    it("Should return false when value is undefined", () => {
      const isArrayType = isArray(undefined);

      expect(isArrayType).toBeDefined();
      expect(isArrayType).toEqual(false);
    });

    it("Should return false when value is an object", () => {
      const isArrayType = isArray({ name: "rodrigo", age: 23 });

      expect(isArrayType).toBeDefined();
      expect(isArrayType).toEqual(false);
    });

    it("Should return false when value is a number", () => {
      const isArrayType = isArray(12);

      expect(isArrayType).toBeDefined();
      expect(isArrayType).toEqual(false);
    });

    it("Should return false when value is a string", () => {
      const isArrayType = isArray("Rodrigo");

      expect(isArrayType).toBeDefined();
      expect(isArrayType).toEqual(false);
    });
  });

  describe("Util isObjectArray", () => {
    it("Should return true when value is an object array", () => {
      const isObjectArrayType = isObjectArray([
        { name: "Rodrigo", lastname: "Limões" },
      ]);

      expect(isObjectArrayType).toBeDefined();
      expect(isObjectArrayType).toEqual(true);
    });

    it("Should return false when value is a number array", () => {
      const isObjectArrayType = isObjectArray([2, 3]);

      expect(isObjectArrayType).toBeDefined();
      expect(isObjectArrayType).toEqual(false);
    });

    it("Should return false when value is a string array", () => {
      const isObjectArrayType = isObjectArray(["Rodrigo"]);

      expect(isObjectArrayType).toBeDefined();
      expect(isObjectArrayType).toEqual(false);
    });

    it("Should return false when value is a undefined array", () => {
      const isObjectArrayType = isObjectArray([undefined]);

      expect(isObjectArrayType).toBeDefined();
      expect(isObjectArrayType).toEqual(false);
    });

    it("Should return false when value is a number", () => {
      const isObjectArrayType = isObjectArray(12);

      expect(isObjectArrayType).toBeDefined();
      expect(isObjectArrayType).toEqual(false);
    });

    it("Should return false when value is a string", () => {
      const isObjectArrayType = isObjectArray("rodrigo");

      expect(isObjectArrayType).toBeDefined();
      expect(isObjectArrayType).toEqual(false);
    });

    it("Should return false when value is null", () => {
      const isObjectArrayType = isObjectArray(null);

      expect(isObjectArrayType).toBeDefined();
      expect(isObjectArrayType).toEqual(false);
    });

    it("Should return false when value is Object", () => {
      const isObjectArrayType = isObjectArray({ name: "Rodrigo", age: 23 });

      expect(isObjectArrayType).toBeDefined();
      expect(isObjectArrayType).toEqual(false);
    });

    it("Should return false when value is a boolean", () => {
      const isObjectArrayType = isObjectArray(true);

      expect(isObjectArrayType).toBeDefined();
      expect(isObjectArrayType).toEqual(false);
    });
  });

  describe("Utils String", () => {
    it("Should return true when value is a string", () => {
      const isStringType = isString("rodrigo");

      expect(isStringType).toBeDefined();
      expect(isStringType).toEqual(true);
    });
  });
});
