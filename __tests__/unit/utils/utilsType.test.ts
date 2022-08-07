import { isDate, isBoolean, isNumber } from "../../../src/libs/utils/utilsType";

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
  });
});
